'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    text: 'Premium Residential Cleaning',
  },
  {
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    text: 'Commercial & Office Cleaning',
  },
  {
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    text: 'Deep Cleaning & Disinfection',
  },
  {
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    text: 'Post‑Construction Cleanup',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-duwan-dark/60 via-duwan-dark/40 to-duwan-dark/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-tight mb-6 max-w-5xl">
          <span className="block">We Provide the Best</span>
          <span className="text-duwan-light">Professional Cleaning</span>
          <span className="block">Services in Maiduguri</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10">
          Trust Duwan Cleaning Services for spotless homes, offices, and post‑construction spaces.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/book"
            className="bg-duwan-royal hover:bg-duwan-light text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            Book Now
          </Link>
          <Link
            href="/services"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-duwan-dark transition-all"
          >
            Our Services
          </Link>
        </div>
        {/* Slide indicators */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current ? 'bg-white scale-110' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}