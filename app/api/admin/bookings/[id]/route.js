// app/api/admin/bookings/[id]/route.js
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { getAuthToken, verifyToken } from '@/lib/auth'

export async function PUT(request, context) {
  // 1. Auth check
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 2. Await params before using id
  const { id } = await context.params
  if (!id) {
    return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 })
  }

  // 3. Parse the request body
  const body = await request.json()
  const { status, date, time } = body
  if (!status) {
    return NextResponse.json({ error: 'Missing status' }, { status: 400 })
  }

  // 4. Connect to DB and update
  await connectToDatabase()

  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    {
      status,
      ...(date && { date: new Date(date) }),
      ...(time && { time }),
    },
    { new: true }
  )
    .populate('customerId', 'name phone email')
    .populate('serviceId', 'title duration')

  if (!updatedBooking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  console.log(`Booking ${id} updated to status: ${status}`)

  return NextResponse.json(updatedBooking)
}