'use client'
import { useState } from 'react'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import MobileMenuDrawer from '@/components/layout/MobileMenuDrawer'
import LogoutButton from '@/components/ui/LogoutButton'

const mobileLinks = [
  { href: '/dashboard', label: 'Bookings', icon: '📅' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
]

export default function DashboardLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Desktop sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 bg-duwan-gray p-6">
        {/* Mobile header */}
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
          <h1 className="text-lg font-heading font-bold text-duwan-dark">My Account</h1>
          <div className="w-8" /> {/* spacer */}
        </div>

        {children}
      </main>

      {/* Mobile drawer */}
      <MobileMenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={mobileLinks}
        title="My Account"
      />
    </div>
  )
}