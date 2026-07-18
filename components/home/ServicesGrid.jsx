'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Skeleton from '@/components/ui/Skeleton'

// Map service titles to Unsplash images
const imageMap = {
  'Residential Cleaning': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Commercial Cleaning': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Deep Cleaning': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Carpet & Upholstery Cleaning': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Post Construction Cleaning': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Floor Care & Polishing': 'https://images.unsplash.com/photo-1580256081112-e49377338b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Disinfection & Sanitization': 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Pressure Washing': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
  'Event Cleanup Services': 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
}

export default function ServicesGrid() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => { setServices(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section className="py-20 bg-duwan-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-duwan-dark text-center mb-4 reveal">Our Services</h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto reveal">From residential to commercial, we offer a full range of cleaning solutions.</p>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service._id} className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 reveal">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageMap[service.title] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-duwan-dark/10 group-hover:bg-duwan-dark/20 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-duwan-dark mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold bg-duwan-gray text-duwan-royal px-3 py-1 rounded-full">
                      {service.duration} min
                    </span>
                    <Link href={`/services#${service._id}`} className="text-duwan-royal text-sm font-medium hover:underline">
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}