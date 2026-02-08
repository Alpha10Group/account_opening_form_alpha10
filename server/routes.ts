import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { individualFormSchema, jointFormSchema, corporateFormSchema } from "@shared/schema";
import { z } from "zod";

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
