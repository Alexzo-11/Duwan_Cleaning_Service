'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/book', label: 'Book' },
    { href: '/login', label: 'Login' },
  ]

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-heading font-bold text-duwan-dark">
        <img
    src="/logo.png"
    alt="Duwan Cleaning Logo"
    className="h-20 w-auto"   // adjust size as needed
  />
          {/* Duwan<span className="text-duwan-royal">Cleaning</span> */}
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 font-medium text-gray-700">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-duwan-royal transition-colors ${
                pathname === link.href ? 'text-duwan-royal font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden relative w-8 h-8 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute h-0.5 w-6 bg-duwan-dark transform transition-all duration-300 ${
              mobileOpen ? 'rotate-45 top-4' : 'top-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-duwan-dark top-4 transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-duwan-dark transform transition-all duration-300 ${
              mobileOpen ? '-rotate-45 top-4' : 'top-6'
            }`}
          />
        </button>
      </div>

      {/* Mobile slide‑down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t px-4 py-2 space-y-1 shadow-lg">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-duwan-royal text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}