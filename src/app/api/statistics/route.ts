import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { statistics } from '@/db/schema';

export async function GET(request: NextRequest) {
  try {
    const stats = await db.select().from(statistics).limit(1);

    if (stats.length === 0) {
      return NextResponse.json({
        ewasteCollectedKg: 0,
        economicValueInr: 0,
        co2AvoidedTons: 0,
        updatedAt: new Date().toISOString()
      }, { status: 200 });
    }

    return NextResponse.json(stats[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error,
        code: 'DATABASE_ERROR'
      },
      { status: 500 }
    );
  }
}