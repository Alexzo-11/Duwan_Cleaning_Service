'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/layout/AdminSidebar'
import MobileMenuDrawer from '@/components/layout/MobileMenuDrawer'
import Spinner from '@/components/ui/Spinner'

const mobileLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { href: '/admin/services', label: 'Services', icon: '🛠️' },
  { href: '/admin/customers', label: 'Customers', icon: '👥' },
]

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user?.role !== 'admin') {
          router.push('/dashboard')
        } else {
          setAuthorized(true)
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false))
  }, [router])

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  if (!authorized) return null

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />

      <main className="flex-1 bg-duwan-gray p-6">
        <div className="md:hidden flex justify-between items-center mb-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-heading font-bold text-duwan-dark">Admin Panel</h1>
          <div className="w-8" />
        </div>
        {children}
      </main>

      <MobileMenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={mobileLinks}
        title="Admin Panel"
      />
    </div>
  )
}