import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { getAuthToken, verifyToken } from '@/lib/auth'

export async function GET(request) {
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await connectToDatabase()

  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit')) || 0

  let query = Booking.find({})
    .populate('customerId', 'name phone email')
    .populate('serviceId', 'title duration')
    .sort({ createdAt: -1 })

  if (limit > 0) {
    query = query.limit(limit)
  }

  const bookings = await query.lean()
  return NextResponse.json(bookings)
}