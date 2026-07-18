'use client'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

export default function ServiceForm({ service, onSaved }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    duration: 60,
    active: true,
  })

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        description: service.description,
        image: service.image || '',
        duration: service.duration,
        active: service.active,
      })
    }
  }, [service])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = service ? `/api/services/${service._id}` : '/api/admin/services'
    const method = service ? 'PUT' : 'POST'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    onSaved()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
      <Textarea label="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
      <Input label="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
      <Input label="Duration (minutes)" type="number" value={form.duration} onChange={e => setForm({...form, duration: Number(e.target.value)})} required />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} />
        Active
      </label>
      <Button type="submit">{service ? 'Update' : 'Create'} Service</Button>
    </form>
  )
}