import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Service from '@/models/Service'

export async function PUT(request, { params }) {
  const { id } = params
  await connectToDatabase()
  const data = await request.json()
  const service = await Service.findByIdAndUpdate(id, data, { new: true })
  return NextResponse.json(service)
}

export async function DELETE(request, { params }) {
  const { id } = params
  await connectToDatabase()
  await Service.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}