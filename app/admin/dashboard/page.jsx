'use client'
import { useEffect, useState } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'
import Spinner from '@/components/ui/Spinner'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(setStats)
    fetch('/api/admin/bookings?limit=5')
      .then(res => res.json())
      .then(setRecentBookings)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-duwan-dark mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Bookings" value={stats.total} color="blue" />
        <StatsCard title="Pending" value={stats.pending} color="yellow" />
        <StatsCard title="Approved" value={stats.approved} color="green" />
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-heading font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4">Service</th>
                <th className="pb-2 pr-4">Date</th>
                <th className="pb-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 pr-4">{b.customerId?.name || 'N/A'}</td>
                  <td className="py-2 pr-4">{b.serviceId?.title || 'N/A'}</td>
                  <td className="py-2 pr-4">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      b.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/admin/bookings" className="text-duwan-royal text-sm mt-4 inline-block hover:underline">
          View all bookings →
        </Link>
      </div>
    </div>
  )
}