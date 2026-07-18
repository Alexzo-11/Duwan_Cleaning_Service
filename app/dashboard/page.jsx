'use client'
import { useEffect, useState } from 'react'
import BookingCard from '@/components/dashboard/BookingCard'
import Skeleton from '@/components/ui/Skeleton'

const TABS = [
  { key: 'all', label: 'All Bookings' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
]

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'pending') return b.status === 'pending'
    if (activeTab === 'approved') return b.status === 'approved'
    return true
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-duwan-dark">
          My Bookings
        </h1>
        <a
          href="/book"
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-duwan-royal text-white font-semibold py-3 px-6 rounded-full hover:bg-duwan-dark transition-colors shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Book New Service
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-duwan-gray rounded-xl mb-8 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 min-w-[90px] py-2.5 px-4 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.key
                ? 'bg-white text-duwan-dark shadow-sm'
                : 'text-gray-600 hover:text-duwan-dark'
              }`}
          >
            {tab.label}
            {tab.key !== 'all' && (
              <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                {tab.key === 'pending'
                  ? bookings.filter(b => b.status === 'pending').length
                  : bookings.filter(b => b.status === 'approved').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-duwan-gray rounded-2xl">
          <div className="text-5xl mb-4">🧹</div>
          <h3 className="text-xl font-heading font-semibold text-duwan-dark mb-2">
            {activeTab === 'pending'
              ? 'No pending bookings'
              : activeTab === 'approved'
                ? 'No approved bookings'
                : 'No bookings yet'}
          </h3>
          <p className="text-gray-500 mb-6">Ready for a spotless space?</p>
          <a
            href="/book"
            className="inline-block bg-duwan-royal text-white font-semibold py-3 px-8 rounded-full hover:bg-duwan-dark transition-colors"
          >
            Book Your First Service
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}