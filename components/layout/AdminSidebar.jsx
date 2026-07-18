'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/ui/LogoutButton'

export default function AdminSidebar() {
  const pathname = usePathname()
  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
    { href: '/admin/services', label: 'Services', icon: '🛠️' },
    { href: '/admin/customers', label: 'Customers', icon: '👥' },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r p-4">
      <h2 className="text-xl font-heading font-bold text-duwan-dark mb-6 px-3">
        Admin Panel
      </h2>
      <nav className="flex-1 space-y-1">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              pathname === link.href
                ? 'bg-duwan-royal text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="border-t pt-4 mt-4">
        <LogoutButton />
      </div>
    </aside>
  )
}