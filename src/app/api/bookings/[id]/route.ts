import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const bookingId = parseInt(id);

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON',
        },
        { status: 400 }
      );
    }

    const { status } = body;

    // Validate required field
    if (!status) {
      return NextResponse.json(
        {
          error: 'Status is required',
          code: 'MISSING_STATUS',
        },
        { status: 400 }
      );
    }

    // Validate status is a non-empty string
    if (typeof status !== 'string' || status.trim() === '') {
      return NextResponse.json(
        {
          error: 'Status must be a non-empty string',
          code: 'INVALID_STATUS',
        },
        { status: 400 }
      );
    }

    // Check if booking exists
    const existingBooking = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, bookingId))
      .limit(1);

    if (existingBooking.length === 0) {
      return NextResponse.json(
        {
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Update booking status
    const updatedBooking = await db
      .update(bookings)
      .set({
        status: status.trim(),
      })
      .where(eq(bookings.id, bookingId))
      .returning();

    return NextResponse.json(updatedBooking[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error,
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}