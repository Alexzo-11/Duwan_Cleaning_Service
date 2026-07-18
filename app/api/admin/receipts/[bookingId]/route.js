import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Receipt from '@/models/Receipt'
import { getAuthToken, verifyToken } from '@/lib/auth'

export async function GET(request, context) {
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Await the params before destructuring
  const { bookingId } = await context.params

  await connectToDatabase()
  const receipt = await Receipt.findOne({ bookingId })
  if (!receipt) return NextResponse.json({ error: 'No receipt yet' }, { status: 404 })

  // In production, serve the file; for now return the URL
  return NextResponse.json({ pdfUrl: receipt.pdfUrl })
}