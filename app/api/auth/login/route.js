import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import { createToken, setAuthCookie } from '@/lib/auth'

export async function POST(request) {
  const { phone, name, email } = await request.json()
  if (!phone || !name) {
    return NextResponse.json({ error: 'Phone and Full Name are required.' }, { status: 400 })
  }

  await connectToDatabase()

  // Find or create user – name is guaranteed to be a non‑empty string
  let user = await User.findOne({ phone })
  if (!user) {
    user = await User.create({
      phone,
      name,                          // required now
      email: email || null,
      role: 'customer',
    })
  } else {
    // Update existing user’s name/email if provided
    user.name = name
    if (email) user.email = email
    await user.save()
  }

  const token = await createToken({ userId: user._id.toString(), phone: user.phone, role: user.role })
  await setAuthCookie(token)

  return NextResponse.json({ user })
}