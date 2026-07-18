import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Service from '@/models/Service'

export async function GET() {
  await connectToDatabase()
  const services = await Service.find({ active: true }).sort({ title: 1 })
  return NextResponse.json(services)
}

export async function POST(request) {
  await connectToDatabase()
  const data = await request.json()
  const service = await Service.create(data)
  return NextResponse.json(service, { status: 201 })
}