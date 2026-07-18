'use client'
import { useEffect, useState } from 'react'
import ServiceForm from '@/components/forms/ServiceForm'
import Button from '@/components/ui/Button'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchServices = () => {
    fetch('/api/admin/services')
      .then(res => res.json())
      .then(setServices)
  }

  useEffect(() => { fetchServices() }, [])

  const deleteService = async (id) => {
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    fetchServices()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-duwan-dark">Manage Services</h1>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>Add Service</Button>
      </div>
      <div className="space-y-4">
        {services.map(s => (
          <div key={s._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.duration} min - {s.active ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setEditing(s); setShowForm(true) }}>Edit</Button>
              <Button variant="outline" className="text-red-600" onClick={() => deleteService(s._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <ServiceForm service={editing} onSaved={() => { setShowForm(false); fetchServices() }} />
        </Modal>
      )}
    </div>
  )
}