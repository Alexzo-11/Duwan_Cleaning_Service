'use client'
import { useState } from 'react'

const imageMap = {
  'Residential Cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Commercial Cleaning': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Deep Cleaning': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Carpet & Upholstery Cleaning': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Post Construction Cleaning': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Floor Care & Polishing': 'https://images.unsplash.com/photo-1580256081112-e49377338b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Disinfection & Sanitization': 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Pressure Washing': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Event Cleanup Services': 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
}

export default function BookingCard({ booking }) {
  const service = booking.serviceId
  const [downloading, setDownloading] = useState(false)

  const handleDownloadReceipt = async () => {
    setDownloading(true)
    try {
      const res = await fetch(`/api/admin/receipts/${booking._id}`)
      const data = await res.json()
      if (data.pdfUrl) {
        window.open(data.pdfUrl, '_blank')
      } else {
        alert('Receipt not available yet.')
      }
    } catch {
      alert('Failed to fetch receipt.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-40 sm:h-auto overflow-hidden">
          <img
            src={imageMap[service?.title] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}
            alt={service?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-heading font-bold text-duwan-dark">
                {service?.title || 'Unknown Service'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                🗓 {new Date(booking.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                at {booking.time}
              </p>
              {booking.address && (
                <p className="text-sm text-gray-500 mt-0.5">📍 {booking.address}</p>
              )}
              {booking.notes && (
                <p className="text-sm text-gray-500 mt-1 italic">📝 {booking.notes}</p>
              )}
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                booking.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {booking.status}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {booking.status === 'approved' && (
              <button
                onClick={handleDownloadReceipt}
                disabled={downloading}
                className="text-sm font-medium text-duwan-royal hover:text-duwan-dark underline underline-offset-2 disabled:opacity-50"
              >
                {downloading ? 'Loading...' : '📄 Download Receipt'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}