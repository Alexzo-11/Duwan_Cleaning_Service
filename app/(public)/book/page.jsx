'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BookingForm from '@/components/forms/BookingForm'
import Spinner from '@/components/ui/Spinner'

export default function BookPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated')
        return res.json()
      })
      .then(data => setUser(data.user))
      .catch(() => router.push('/login?redirect=/book'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>
  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-heading font-bold text-duwan-dark mb-8">Book a Cleaning Service</h1>
      <BookingForm user={user} />
    </div>
  )
}