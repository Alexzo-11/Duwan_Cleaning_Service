'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

export default function ContactInfo() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        const data = await res.json()
        setStatus(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('Network error')
    }
  }

  return (
    <section id="contact" className="py-20 bg-duwan-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-duwan-dark text-center mb-12 reveal">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 reveal">
            <h3 className="text-2xl font-heading font-semibold mb-6">Send us a message</h3>
            {status === 'sent' ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                Thank you! We’ll get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
                <Textarea
                  label="Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  required
                />
                <Button type="submit" disabled={status === 'sending'} className="w-full">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
                {status && status !== 'sending' && status !== 'sent' && (
                  <p className="text-red-500 text-sm">{status}</p>
                )}
              </form>
            )}
          </div>

          {/* Map & Info */}
          <div className="reveal space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-heading font-semibold mb-4">Visit Our Office</h3>
              <p className="text-gray-600 mb-2">
                Galadima Junction Beside NNPC Filling Station, Maiduguri, Borno State
              </p>
              <p className="text-gray-600 mb-4">Phone: 0810 650 9069</p>
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.928694057012!2d13.151722!3d11.831098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1104c7e5b7e8a6b%3A0x9e5a5b3e3b6f8a4!2sGaladima%20Junction%2C%20Maiduguri!5e0!3m2!1sen!2sng!4v1690000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-4 items-center justify-center text-2xl">
              <a href="https://instagram.com/Duwan_Cleaning" target="_blank" className="hover:text-duwan-royal transition-colors">📷</a>
              <a href="https://tiktok.com/@Duwan.cleaning.se" target="_blank" className="hover:text-duwan-royal transition-colors">🎵</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}