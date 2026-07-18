import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Service from '@/models/Service'
import { getAuthToken, verifyToken } from '@/lib/auth'

export async function GET() {
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await connectToDatabase()
  const services = await Service.find({})
  return NextResponse.json(services)
}

export async function POST(request) {
  const token = await getAuthToken()
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await connectToDatabase()
  const data = await request.json()
  const service = await Service.create(data)
  return NextResponse.json(service, { status: 201 })
}