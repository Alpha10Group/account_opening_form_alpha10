import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE account_type AS ENUM ('individual', 'joint', 'corporate');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
    `);
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        account_type account_type NOT NULL,
        status application_status NOT NULL DEFAULT 'pending',
        reference_number TEXT NOT NULL UNIQUE,
        form_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    console.log("[db] Schema initialized");
  } finally {
    client.release();
  }
}
