import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'; // Ensure env vars are loaded

const rawUrl = process.env.DATABASE_URL || '';
const connectionString = rawUrl.split('?')[0]; // Remove ?sslmode=require
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: ["error", "warn", "query"],
});

export default prisma;