import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import OTP from '@/models/OTP'
import { generateOTP } from '@/lib/utils'

export async function POST(request) {
  const { phone } = await request.json()
  if (!phone) return NextResponse.json({ error: 'Phone required' }, { status: 400 })

  await connectToDatabase()
  await OTP.deleteMany({ phone })   // remove old OTPs for this number

  const otp = generateOTP()
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)  // 5 minutes

  await OTP.create({ phone, otp, expiresAt })

  console.log(`📱 OTP for ${phone}: ${otp}`)  // shows in terminal (for testing)

  return NextResponse.json({ message: 'OTP sent successfully' })
}