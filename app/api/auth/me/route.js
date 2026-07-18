import { NextResponse } from 'next/server'
import { getAuthToken, verifyToken } from '@/lib/auth'
import User from '@/models/User'
import connectToDatabase from '@/lib/mongodb'

export async function GET() {
  const token = await getAuthToken()
  if (!token) return NextResponse.json({ user: null }, { status: 401 })
  const payload = await verifyToken(token)
  if (!payload) return NextResponse.json({ user: null }, { status: 401 })
  await connectToDatabase()
  const user = await User.findById(payload.userId).select('-__v')
  if (!user) return NextResponse.json({ user: null }, { status: 401 })
  return NextResponse.json({ user })
}