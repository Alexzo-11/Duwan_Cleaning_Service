'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ProfileForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !phone) {
      setError('Name and WhatsApp number are required.')
      return
    }
    setLoading(true)
    await onSubmit(name, email, phone)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5">
      <Input
        label="Full Name *"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        placeholder="Full Name"
      />
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email Adress"
      />
      <Input
        label="WhatsApp Number *"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        placeholder="Whatsapp Number"
        type="tel"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full py-3">
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </form>
  )
}