import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { getAuthToken, verifyToken } from '@/lib/auth'

export async function GET() {
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await connectToDatabase()

  const total = await Booking.countDocuments()
  const pending = await Booking.countDocuments({ status: 'pending' })
  const completed = await Booking.countDocuments({ status: 'completed' })

  return NextResponse.json({ total, pending, completed })
}
