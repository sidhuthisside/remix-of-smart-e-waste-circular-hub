import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pledges } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Name is required and must be a non-empty string',
          code: 'MISSING_NAME'
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Email is required and must be a non-empty string',
          code: 'MISSING_EMAIL'
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message ? message.trim() : null;

    // Insert new pledge
    const newPledge = await db.insert(pledges)
      .values({
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newPledge[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error,
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const result = await db.select({ 
      count: sql<number>`count(*)` 
    }).from(pledges);

    const count = Number(result[0].count);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error,
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}