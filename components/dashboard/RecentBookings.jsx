'use client'
import { useEffect, useState } from 'react'
import Spinner from '@/components/ui/Spinner'

export default function RecentBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/admin/bookings?limit=5')
      .then(res => res.json())
      .then(data => setBookings(data.slice(0,5)))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <Spinner />
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
      {bookings.map(b => (
        <div key={b._id} className="flex justify-between py-2 border-b last:border-0">
          <span>{b.customerId?.name}</span>
          <span>{b.serviceId?.title}</span>
          <span className="text-sm">{b.status}</span>
        </div>
      ))}
    </div>
  )
}