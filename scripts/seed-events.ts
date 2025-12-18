import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { events } from '../lib/db/schema'
import * as schema from '../lib/db/schema'
import { randomUUID } from 'crypto'

const dbUrl = process.env.DATABASE_URL!
const client = postgres(dbUrl, { prepare: false })
const db = drizzle(client, { schema })

const userId = '1cbf6f71-3e99-4f5a-9409-15a1c2bdb3e4'

async function seed() {
    console.log('Seeding events with thumbnails...')
    const now = new Date()
    const entries = []

    for (let i = 0; i < 10; i++) {
        const startTime = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000) // i+1 days from now
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000) // 2 hours duration

        entries.push({
            id: randomUUID(),
            userId,
            title: `Event ${i + 1} with Thumbnail`,
            description: `This is a generated event description for Event ${i + 1}.`,
            startTime,
            endTime,
            isLive: false,
            status: 'draft',
            thumbnailUrl: `https://picsum.photos/seed/${i + 1}/800/450`,
            createdAt: now,
            updatedAt: now,
        })
    }

    try {
        await db.insert(events).values(entries)
        console.log('Successfully inserted 10 events with thumbnails')
    } catch (error) {
        console.error('Error inserting events:', error)
    } finally {
        await client.end()
    }
}

seed()
