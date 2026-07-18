'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginForm({ onOtpSent }) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })
    if (res.ok) {
      onOtpSent(phone)
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to send OTP')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="08012345678" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">{loading ? 'Sending...' : 'Send OTP'}</Button>
    </form>
  )
}