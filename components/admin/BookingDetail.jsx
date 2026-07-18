'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function BookingDetail({ booking, onUpdate }) {
  const [status, setStatus] = useState(booking.status)
  const [loading, setLoading] = useState(false)

  const updateStatus = async (newStatus) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/bookings/${booking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setStatus(newStatus)
        onUpdate && onUpdate()
      }
    } catch (error) {
      console.error('Update failed', error)
    } finally {
      setLoading(false)
    }
  }

  const statusColor = (s) => {
    switch (s) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-bold text-duwan-dark">
          {booking.serviceId?.title || 'Service'}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
        <div><strong>Customer:</strong> {booking.customerId?.name}</div>
        <div><strong>Phone:</strong> {booking.customerId?.phone}</div>
        <div><strong>Email:</strong> {booking.customerId?.email || 'N/A'}</div>
        <div><strong>Address:</strong> {booking.address}</div>
        <div><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
        <div><strong>Time:</strong> {booking.time}</div>
        {booking.notes && <div className="sm:col-span-2"><strong>Notes:</strong> {booking.notes}</div>}
      </div>

      {status === 'pending' && (
        <div className="flex gap-2 mt-4">
          <Button onClick={() => updateStatus('approved')} disabled={loading} className="bg-green-600 hover:bg-green-700 flex-1">
            Approve
          </Button>
          <Button onClick={() => updateStatus('rejected')} disabled={loading} className="bg-red-600 hover:bg-red-700 flex-1">
            Reject
          </Button>
        </div>
      )}
      {status === 'approved' && (
        <p className="text-sm text-green-700 mt-2">This booking has been approved.</p>
      )}
      {status === 'rejected' && (
        <p className="text-sm text-red-700 mt-2">This booking has been rejected.</p>
      )}
    </div>
  )
}

const updateStatus = async (newStatus) => {
  setLoading(true)
  try {
    const res = await fetch(`/api/admin/bookings/${booking._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      setStatus(newStatus)
      onUpdate && onUpdate()
    } else {
      const err = await res.json()
      alert(`Failed: ${err.error || 'Unknown error'}`)
    }
  } catch (error) {
    console.error('Update error:', error)
    alert('Network error')
  } finally {
    setLoading(false)
  }
}