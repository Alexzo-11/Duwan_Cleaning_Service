'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

// Separate the part that uses useSearchParams into its own component
function LoginForm() {
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
        placeholder="08012345678"
        type="tel"
      />
      <Input
        label="Email (optional)"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full py-3">
        {loading ? 'Logging in...' : 'Continue'}
      </Button>
    </form>
  )
}

// Main page component wraps LoginForm in Suspense
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-heading font-bold text-duwan-dark mb-8 text-center">
        Login / Register
      </h1>
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
