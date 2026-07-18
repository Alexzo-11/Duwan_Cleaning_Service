import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { getAuthToken, verifyToken } from '@/lib/auth'
import { generateReceiptPDF } from '@/lib/pdf'
import { sendReceiptEmail } from '@/lib/email'
import { notifyBookingApproved, notifyJobCompleted } from '@/lib/whatsapp'
import Receipt from '@/models/Receipt'
import { generateReceiptNumber } from '@/lib/utils'
import User from '@/models/User'
import Service from '@/models/Service'
import fs from 'fs'

export async function PUT(request, { params }) {
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = params
  const { status, date, time } = await request.json()

  await connectToDatabase()
  const updateData = {}
  if (status) updateData.status = status
  if (date) updateData.date = new Date(date)
  if (time) updateData.time = time

  const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true })
    .populate('customerId', 'name phone email')
    .populate('serviceId', 'title duration')

  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  // WhatsApp notifications
  const customer = booking.customerId
  if (status === 'approved') {
    notifyBookingApproved(customer.phone, customer.name, booking.bookingId)
  } else if (status === 'completed') {
    // Generate receipt
    const receiptNumber = generateReceiptNumber()
    const pdfPath = await generateReceiptPDF(booking, customer, booking.serviceId, receiptNumber)
    const receipt = await Receipt.create({
      bookingId: booking._id,
      receiptNumber,
      pdfUrl: pdfPath,
    })

    // Send email
    if (customer.email) {
      await sendReceiptEmail(
        customer.email,
        'Cleaning Service Completion Receipt',
        pdfPath
      )
    }

    notifyJobCompleted(customer.phone, customer.name)
  }

  return NextResponse.json(booking)
}

export async function DELETE(request, { params }) {
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = params
  await connectToDatabase()
  await Booking.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}