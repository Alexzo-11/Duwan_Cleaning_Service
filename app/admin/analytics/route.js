import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'

export async function GET() {
  await connectToDatabase()
  const total = await Booking.countDocuments()
  const pending = await Booking.countDocuments({ status: 'pending' })
  const completed = await Booking.countDocuments({ status: 'completed' })
  return NextResponse.json({ total, pending, completed })
}