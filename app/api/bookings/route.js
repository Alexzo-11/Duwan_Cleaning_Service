// (GET, PUT, DELETE)
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { getAuthToken, verifyToken } from '@/lib/auth'
import { generateBookingId } from '@/lib/utils'
import { notifyBookingSubmitted } from '@/lib/whatsapp'
import User from '@/models/User'
import Service from '@/models/Service'

export async function GET() {
  const token = await getAuthToken()
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const payload = await verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectToDatabase()
  const bookings = await Booking.find({ customerId: payload.userId })
    .populate('serviceId')
    .sort({ createdAt: -1 })
  return NextResponse.json(bookings)
}

export async function POST(request) {
  const token = await getAuthToken()
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const payload = await verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { serviceId, address, date, time, notes } = await request.json()
  if (!serviceId || !address || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  await connectToDatabase()

  // Check for double booking
  const exists = await Booking.findOne({ date, time, serviceId, status: { $ne: 'rejected' } })
  if (exists) return NextResponse.json({ error: 'Time slot already booked' }, { status: 409 })

  const bookingId = generateBookingId()
  const booking = await Booking.create({
    bookingId,
    customerId: payload.userId,
    serviceId,
    address,
    date: new Date(date),
    time,
    notes,
  })

  // Notify via WhatsApp
  const user = await User.findById(payload.userId)
  // notifyBookingSubmitted(user.phone, user.name, bookingId)

  return NextResponse.json(booking, { status: 201 })
}