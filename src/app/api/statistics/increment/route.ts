import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { statistics } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ewasteCollectedKg, economicValueInr, co2AvoidedTons } = body;

    // Validate that at least one increment field is provided
    const hasValidIncrementField = 
      (typeof ewasteCollectedKg === 'number' && !isNaN(ewasteCollectedKg)) ||
      (typeof economicValueInr === 'number' && !isNaN(economicValueInr)) ||
      (typeof co2AvoidedTons === 'number' && !isNaN(co2AvoidedTons));

    if (!hasValidIncrementField) {
      return NextResponse.json(
        { 
          error: 'At least one valid increment field must be provided (ewasteCollectedKg, economicValueInr, or co2AvoidedTons)',
          code: 'NO_VALID_INCREMENT_FIELDS'
        },
        { status: 400 }
      );
    }

    // Validate that provided fields are positive integers
    if (ewasteCollectedKg !== undefined && (typeof ewasteCollectedKg !== 'number' || ewasteCollectedKg < 0 || !Number.isInteger(ewasteCollectedKg))) {
      return NextResponse.json(
        { 
          error: 'ewasteCollectedKg must be a non-negative integer',
          code: 'INVALID_EWASTE_VALUE'
        },
        { status: 400 }
      );
    }

    if (economicValueInr !== undefined && (typeof economicValueInr !== 'number' || economicValueInr < 0 || !Number.isInteger(economicValueInr))) {
      return NextResponse.json(
        { 
          error: 'economicValueInr must be a non-negative integer',
          code: 'INVALID_ECONOMIC_VALUE'
        },
        { status: 400 }
      );
    }

    if (co2AvoidedTons !== undefined && (typeof co2AvoidedTons !== 'number' || co2AvoidedTons < 0 || !Number.isInteger(co2AvoidedTons))) {
      return NextResponse.json(
        { 
          error: 'co2AvoidedTons must be a non-negative integer',
          code: 'INVALID_CO2_VALUE'
        },
        { status: 400 }
      );
    }

    // Fetch the current statistics record (id=1)
    const existingStats = await db.select()
      .from(statistics)
      .where(eq(statistics.id, 1))
      .limit(1);

    const currentTimestamp = new Date().toISOString();

    // If no statistics exist, create initial record with increment values
    if (existingStats.length === 0) {
      const newStats = await db.insert(statistics)
        .values({
          ewasteCollectedKg: ewasteCollectedKg || 0,
          economicValueInr: economicValueInr || 0,
          co2AvoidedTons: co2AvoidedTons || 0,
          updatedAt: currentTimestamp
        })
        .returning();

      return NextResponse.json(newStats[0], { status: 200 });
    }

    // If statistics exist, increment the provided fields
    const currentStats = existingStats[0];
    const updatedStats = await db.update(statistics)
      .set({
        ewasteCollectedKg: currentStats.ewasteCollectedKg + (ewasteCollectedKg || 0),
        economicValueInr: currentStats.economicValueInr + (economicValueInr || 0),
        co2AvoidedTons: currentStats.co2AvoidedTons + (co2AvoidedTons || 0),
        updatedAt: currentTimestamp
      })
      .where(eq(statistics.id, 1))
      .returning();

    return NextResponse.json(updatedStats[0], { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error,
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}