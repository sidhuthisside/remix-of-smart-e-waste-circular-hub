import { db } from '@/db';
import { statistics } from '@/db/schema';

async function main() {
    const sampleStatistics = [
        {
            ewasteCollectedKg: 156789,
            economicValueInr: 45230000,
            co2AvoidedTons: 8934,
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(statistics).values(sampleStatistics);
    
    console.log('✅ Statistics seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});