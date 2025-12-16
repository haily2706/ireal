
import { db } from '../lib/db';
import { tokens } from '../lib/db/schema';
import { randomUUID } from 'crypto';

async function main() {
    console.log('Seeding LREAL token...');

    const tokenData = {
        id: randomUUID(),
        tokenId: '0.0.7464170',
        name: 'LiveReal',
        symbol: 'LREAL',
        decimals: '2',
        totalSupply: '11000000000', // 110,000,000.00
        description: 'LiveReal Native Token',
    };

    try {
        await db.insert(tokens).values(tokenData).onConflictDoNothing();
        console.log('LREAL token seeded successfully:', tokenData);
    } catch (error) {
        console.error('Error seeding token:', error);
    }

    process.exit(0);
}

main();
