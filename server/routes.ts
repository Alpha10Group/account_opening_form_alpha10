import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { individualFormSchema, jointFormSchema, corporateFormSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const uploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const category = (req.query.category as string) || "file";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${category}-${uniqueSuffix}${ext}`);
  },
});

const imageOnlyFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, JPG, and WEBP image files are allowed"));
  }
};

const documentFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = [
    "image/png", "image/jpeg", "image/jpg", "image/webp",
    "application/pdf",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, JPG, WEBP, and PDF files are allowed"));
  }
};

const uploadImage = multer({
  storage: uploadStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: imageOnlyFilter,
});

const uploadDocument = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: documentFilter,
});

function generateReferenceNumber(type: string): string {
  const prefix = type === "individual" ? "IND" : type === "joint" ? "JNT" : "CRP";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/api/uploads", (await import("express")).default.static(uploadsDir));

  app.post("/api/upload-signature", uploadImage.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const fileUrl = `/api/uploads/${req.file.filename}`;
      res.json({ url: fileUrl, filename: req.file.filename });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ message: error.message || "Upload failed" });
    }
  });

  app.post("/api/upload-document", uploadDocument.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const fileUrl = `/api/uploads/${req.file.filename}`;
      const isPdf = req.file.mimetype === "application/pdf";
      res.json({ url: fileUrl, filename: req.file.filename, isPdf });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ message: error.message || "Upload failed" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const body = req.body;
      const accountType = body.accountType;

      let validatedData: any;
      if (accountType === "individual") {
        validatedData = individualFormSchema.parse(body);
      } else if (accountType === "joint") {
        validatedData = jointFormSchema.parse(body);
      } else if (accountType === "corporate") {
        validatedData = corporateFormSchema.parse(body);
      } else {
        return res.status(400).json({ message: "Invalid account type" });
      }

      const referenceNumber = generateReferenceNumber(accountType);

      const application = await storage.createApplication({
        accountType,
        referenceNumber,
        formData: validatedData,
        status: "pending",
      });

      res.status(201).json({
        id: application.id,
        referenceNumber: application.referenceNumber,
        status: application.status,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
        return res.status(400).json({ message: `Validation failed: ${messages}` });
      }
      console.error("Application submission error:", error);
      res.status(500).json({ message: "Internal server error. Please try again." });
    }
  });

  app.get("/api/applications", async (_req, res) => {
    try {
      const apps = await storage.getAllApplications();
      res.json(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/applications/:id", async (req, res) => {
    try {
      const application = await storage.getApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
