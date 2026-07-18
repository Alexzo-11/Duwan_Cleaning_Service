'use client'
import { useEffect, useState } from 'react'
import Skeleton from '@/components/ui/Skeleton'
import Link from 'next/link'

// Reuse image map from home page
const imageMap = { /* same as above */ }

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => { setServices(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero mini */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-duwan-dark/60" />
        <h1 className="relative text-4xl md:text-5xl font-heading font-bold text-white">Our Services</h1>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <Link key={service._id} href={`/book?service=${service._id}`} className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageMap[service.title] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-duwan-dark mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{service.description}</p>
                  <span className="text-xs font-semibold bg-duwan-gray text-duwan-royal px-3 py-1 rounded-full">{service.duration} min</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}