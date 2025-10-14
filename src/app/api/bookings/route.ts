import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_name, email, phone, address, device_type, device_count, preferred_date } = body;

    // Validate required fields
    if (!user_name || typeof user_name !== 'string' || user_name.trim() === '') {
      return NextResponse.json({
        error: 'User name is required and must be a non-empty string',
        code: 'INVALID_USER_NAME'
      }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json({
        error: 'Email is required and must be a non-empty string',
        code: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json({
        error: 'Phone is required and must be a non-empty string',
        code: 'INVALID_PHONE'
      }, { status: 400 });
    }

    if (!address || typeof address !== 'string' || address.trim() === '') {
      return NextResponse.json({
        error: 'Address is required and must be a non-empty string',
        code: 'INVALID_ADDRESS'
      }, { status: 400 });
    }

    if (!device_type || typeof device_type !== 'string' || device_type.trim() === '') {
      return NextResponse.json({
        error: 'Device type is required and must be a non-empty string',
        code: 'INVALID_DEVICE_TYPE'
      }, { status: 400 });
    }

    if (!device_count || typeof device_count !== 'number' || !Number.isInteger(device_count) || device_count <= 0) {
      return NextResponse.json({
        error: 'Device count is required and must be a positive integer',
        code: 'INVALID_DEVICE_COUNT'
      }, { status: 400 });
    }

    if (!preferred_date || typeof preferred_date !== 'string' || preferred_date.trim() === '') {
      return NextResponse.json({
        error: 'Preferred date is required and must be a non-empty string',
        code: 'INVALID_PREFERRED_DATE'
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      userName: user_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      deviceType: device_type.trim(),
      deviceCount: device_count,
      preferredDate: preferred_date.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Insert booking
    const newBooking = await db.insert(bookings)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newBooking[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Filter by status
    const status = searchParams.get('status');

    let query = db.select().from(bookings).orderBy(desc(bookings.createdAt));

    // Apply status filter if provided
    if (status) {
      query = query.where(eq(bookings.status, status));
    }

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}