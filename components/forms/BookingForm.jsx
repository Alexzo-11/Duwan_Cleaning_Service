'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

export default function BookingForm({ user }) {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '') // WhatsApp number
  const [slots, setSlots] = useState([])
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(setServices)
  }, [])

  useEffect(() => {
    if (date && selectedService) {
      fetch(`/api/bookings/available-slots?date=${date}&serviceId=${selectedService}`)
        .then(res => res.json())
        .then(setSlots)
    }
  }, [date, selectedService])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: selectedService,
        address,
        date,
        time,
        notes,
        // Optionally update user profile with these values? Not needed for booking.
      }),
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      const data = await res.json()
      setError(data.error || 'Booking failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-heading font-bold text-duwan-dark mb-2">Book a Service</h2>

      {/* Personal info section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="John Doe"
        />
        <Input
          label="WhatsApp No. *"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          placeholder="08012345678"
          type="tel"
        />
        <div className="sm:col-span-2">
          <Input
            label="Email Address *"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Service selection */}
      <div>
        <Select label="Cleaning Service *" value={selectedService} onChange={e => setSelectedService(e.target.value)} required>
          <option value="">Select a service</option>
          {services.map(s => (
            <option key={s._id} value={s._id}>{s.title} ({s.duration} min)</option>
          ))}
        </Select>
      </div>

      {/* Address */}
      <div>
        <Input label="Service Address *" value={address} onChange={e => setAddress(e.target.value)} required placeholder="123 Main St, Maiduguri" />
      </div>

      {/* Date and time picker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Preferred Date *" type="date" value={date} onChange={e => setDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} />
        {date && selectedService && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-1 border border-gray-200 rounded-lg">
              {slots.length === 0 && <p className="col-span-3 text-xs text-gray-500 p-2">No slots available</p>}
              {slots.map(slot => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  className={`p-2 text-sm rounded border ${
                    time === slot.time
                      ? 'bg-duwan-royal text-white border-duwan-royal'
                      : slot.available
                      ? 'hover:bg-gray-100 border-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                  }`}
                  onClick={() => slot.available && setTime(slot.time)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <Textarea label="Special Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special requests or directions..." />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

      <Button type="submit" className="w-full py-3 text-lg">
        Confirm Booking
      </Button>
    </form>
  )
}