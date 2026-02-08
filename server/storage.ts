import { applications, type Application, type InsertApplication } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createApplication(application: InsertApplication): Promise<Application>;
  getApplication(id: string): Promise<Application | undefined>;
  getApplicationByReference(referenceNumber: string): Promise<Application | undefined>;
  getAllApplications(): Promise<Application[]>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(application: InsertApplication): Promise<Application> {
    const [result] = await db.insert(applications).values(application).returning();
    return result;
  }

  async getApplication(id: string): Promise<Application | undefined> {
    const [result] = await db.select().from(applications).where(eq(applications.id, id));
    return result;
  }

  async getApplicationByReference(referenceNumber: string): Promise<Application | undefined> {
    const [result] = await db.select().from(applications).where(eq(applications.referenceNumber, referenceNumber));
    return result;
  }

  async getAllApplications(): Promise<Application[]> {
    return db.select().from(applications).orderBy(desc(applications.createdAt));
  }
}

export const storage = new DatabaseStorage();
