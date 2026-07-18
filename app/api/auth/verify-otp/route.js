import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import OTP from '@/models/OTP'
import User from '@/models/User'
import { createToken, setAuthCookie } from '@/lib/auth'

export async function POST(request) {
  const { phone, otp, name, email } = await request.json()
  if (!phone || !otp) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  await connectToDatabase()

  // Debug logging (remove after testing)
  console.log('Looking for OTP with:', { phone, otp })

  const record = await OTP.findOne({
    phone,
    otp,
    expiresAt: { $gt: new Date() },
  })

  console.log('Found OTP record:', record)

  if (!record) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 })
  }

  // Find or create user
  let user = await User.findOne({ phone })
  if (!user) {
    user = await User.create({
      name: name || 'Customer',
      phone,
      email: email || null,
      role: 'customer',
    })
  } else {
    if (name) user.name = name
    if (email) user.email = email
    await user.save()
  }

  // Delete the used OTP
  await OTP.deleteOne({ _id: record._id })

  // Create JWT and set cookie
  const token = await createToken({
    userId: user._id.toString(),
    phone: user.phone,
    role: user.role,
  })
  await setAuthCookie(token)

  return NextResponse.json({ user, token })
}