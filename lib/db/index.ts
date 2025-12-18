import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

let dbUrl = process.env.DATABASE_URL!
if (dbUrl && dbUrl.includes('postgres:postgres@supabase_db_')) {
    // This seems to be a fix for some specific local/internal url format
    // Preserving as is, but using new URL API if possible or just string manip
    // The original code used URL.parse which is deprecated, but let's stick to safe logic
    try {
        const url = new URL(dbUrl);
        if (url.hostname.includes('_')) {
            url.hostname = url.hostname.split('_')[1]
            dbUrl = url.href
        }
    } catch (e) {
        // Fallback or ignore if invalid URL
    }
}

// Singleton pattern to prevent max connections in Next.js development
const globalForDb = global as unknown as { conn: postgres.Sql | undefined }

const client = globalForDb.conn ?? postgres(dbUrl, { prepare: false })

if (process.env.NODE_ENV !== 'production') {
    globalForDb.conn = client
}

export const db = drizzle(client, { schema });