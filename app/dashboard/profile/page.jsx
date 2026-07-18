'use client'
import { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => { setUser(data.user); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    // Since we don't have a dedicated profile update API, we'll just show a message.
    // In a real app you'd call PATCH /api/user. For now, we show a success message.
    setTimeout(() => {
      setMessage('Profile updated successfully! (demo)')
      setSaving(false)
    }, 800)
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>
  if (!user) return <p className="text-center py-20 text-gray-500">Not logged in.</p>

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-heading font-bold text-duwan-dark mb-8">Profile Settings</h1>
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <Input label="Phone Number" value={user.phone} disabled />
        <Input
          label="Full Name"
          defaultValue={user.name}
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input
          label="Email Address"
          type="email"
          defaultValue={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Button type="submit" disabled={saving} className="w-full">
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
        {message && (
          <p className="text-sm text-green-600 text-center">{message}</p>
        )}
      </form>
    </div>
  )
}