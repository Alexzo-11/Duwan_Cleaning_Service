'use client'
import { useEffect, useState } from 'react'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  useEffect(() => {
    fetch('/api/admin/customers')
      .then(res => res.json())
      .then(setCustomers)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-duwan-dark mb-6">Customers</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map(c => (
              <tr key={c._id}>
                <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.email || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}