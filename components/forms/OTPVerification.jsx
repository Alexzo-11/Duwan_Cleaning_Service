'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function OTPVerification({ phone, userData, onSuccess }) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        otp,
        name: userData.name,
        email: userData.email,
      }),
    })
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      setError(data.error || 'Invalid OTP')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5">
      <p className="text-sm text-gray-600">
        An OTP was sent to <strong>{phone}</strong>
      </p>
      <Input
        label="Enter OTP *"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        required
        maxLength={6}
        placeholder="......."
        type="text"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full py-3">
        {loading ? 'Verifying...' : 'Verify & Login'}
      </Button>
    </form>
  )
}