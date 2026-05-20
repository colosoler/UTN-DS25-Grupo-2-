import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config'; // Ensure env vars are loaded

const rawUrl = process.env.DATABASE_URL || '';
const url = new URL(rawUrl);
const sslmode = url.searchParams.get('sslmode');
const pool = new Pool({
  connectionString: rawUrl,
  ssl: sslmode === 'disable' ? false : { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: ["error", "warn", "query"],
});

export default prisma;