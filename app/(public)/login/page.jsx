'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!phone || !name) {
      setError('Phone number and Full Name are required.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name, email }),
      })
      if (res.ok) {
        router.push(redirect)
      } else {
        const data = await res.json()
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-heading font-bold text-duwan-dark mb-8 text-center">
        Login / Register
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5">
        <Input
          label="Full Name *"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="John Doe"
        />
        <Input
          label="WhatsApp Number *"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          placeholder="Whatsapp Number"
          type="tel"
        />
        <Input
          label="Email (optional)"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full py-3">
          {loading ? 'Logging in...' : 'Continue'}
        </Button>
      </form>
    </div>
  )
}