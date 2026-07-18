'use client'
import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import BookingDetail from '@/components/admin/BookingDetail'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const fetchBookings = () => {
    fetch('/api/admin/bookings')
      .then(res => res.json())
      .then(data => { setBookings(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchBookings() }, [])

  const handleView = (booking) => {
    setSelectedBooking(booking)
    setShowModal(true)
  }

  const handleUpdate = () => {
    setShowModal(false)
    fetchBookings()
  }

  // Helper to format WhatsApp URL (international format without +)
  const getWhatsAppUrl = (phone) => {
    if (!phone) return '#'
    // Remove any non-digit characters, keep only numbers
    let cleaned = phone.replace(/\D/g, '')
    // If it starts with 0, assume Nigerian number and prepend 234
    if (cleaned.startsWith('0')) {
      cleaned = '234' + cleaned.substring(1)
    }
    return `https://wa.me/${cleaned}`
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-duwan-dark mb-6">Booking Management</h1>

      {loading ? (
        <div className="flex justify-center py-10"><Spinner /></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600 font-medium">
                <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map(booking => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {booking.customerId?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{booking.customerId?.phone}</td>
                    <td className="px-6 py-4">{booking.serviceId?.title}</td>
                    <td className="px-6 py-4">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{booking.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => handleView(booking)} className="text-xs py-1 px-3">
                          View
                        </Button>
                        <a
                          href={getWhatsAppUrl(booking.customerId?.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 2.09.55 4.14 1.6 5.94L0 24l6.27-1.57C7.96 23.45 9.96 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm5.8 17.7c-.2.56-1.04.96-1.7 1.1-.46.1-1.06.18-3.07-.65-2.6-1.07-4.25-3.68-4.38-3.85-.13-.17-1.05-1.4-1.05-2.67 0-1.27.66-1.89.9-2.15.24-.26.52-.33.7-.33.18 0 .36.01.52.01.17 0 .4-.07.63.48.24.55.81 1.98.88 2.12.07.14.12.3.04.48-.08.18-.12.3-.24.46-.12.17-.25.38-.36.51-.12.13-.25.28-.1.54.14.26.63 1.04 1.36 1.68.94.84 1.73 1.1 1.98 1.22.25.12.4.1.55-.06.15-.16.63-.73.8-.98.17-.25.34-.21.57-.13.23.09 1.47.7 1.72.82.25.12.42.18.48.28.06.1.06.58-.14 1.14z"/>
                          </svg>
                          Chat
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        {selectedBooking && (
          <BookingDetail booking={selectedBooking} onUpdate={handleUpdate} />
        )}
      </Modal>
    </div>
  )
}