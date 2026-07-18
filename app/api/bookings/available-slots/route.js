import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'
import Service from '@/models/Service'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  const serviceId = searchParams.get('serviceId')

  if (!date || !serviceId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  await connectToDatabase()
  const service = await Service.findById(serviceId)
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })

  // Get bookings for that date and service
  const bookedSlots = await Booking.find({
    date: new Date(date),
    serviceId,
    status: { $nin: ['rejected'] },
  }).select('time')

  const bookedTimes = bookedSlots.map(b => b.time)

  // Generate all possible time slots from 08:00 to 18:00 with service duration
  const slots = []
  const startHour = 8
  const endHour = 18
  const interval = service.duration // minutes
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += interval) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      const end = new Date(2023, 0, 1, h, m + interval)
      const endTime = `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`
      if (end.getHours() <= endHour && !(end.getHours() === endHour && end.getMinutes() > 0)) {
        slots.push({
          time,
          endTime,
          available: !bookedTimes.includes(time),
        })
      }
    }
  }

  return NextResponse.json(slots)
}