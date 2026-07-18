'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function BookingDetail({ booking, onUpdate }) {
  const [status, setStatus] = useState(booking.status)

  const updateStatus = async (newStatus) => {
    await fetch(`/api/admin/bookings/${booking._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    setStatus(newStatus)
    onUpdate()
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{booking.serviceId?.title}</h3>
      <p><strong>Customer:</strong> {booking.customerId?.name}</p>
      <p><strong>Phone:</strong> {booking.customerId?.phone}</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
      <p><strong>Status:</strong> {status}</p>
      <div className="flex gap-2 mt-4">
        {status === 'pending' && (
          <>
            <Button onClick={() => updateStatus('approved')} className="bg-green-600">Approve</Button>
            <Button onClick={() => updateStatus('rejected')} className="bg-red-600">Reject</Button>
          </>
        )}
        {status === 'approved' && (
          <>
            <Button onClick={() => updateStatus('in_progress')} className="bg-yellow-600">In Progress</Button>
            <Button onClick={() => updateStatus('completed')} className="bg-duwan-royal">Complete</Button>
          </>
        )}
      </div>
    </div>
  )
}