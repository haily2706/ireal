import 'dotenv/config';
import { createUserAccount } from '../lib/hedera/client';

async function main() {
    console.log('Testing Hedera Account Creation...');
    try {
        const result = await createUserAccount();
        console.log('Success!', result);
    } catch (error) {
        console.error('Failed:', error);
    }
}

main();
