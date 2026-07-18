const mongoose = require('mongoose')
const Service = require('../models/Service')

const MONGODB_URI = 'mongodb://localhost:27017/duwan_cleaning'

const services = [
  {
    title: 'Residential Cleaning',
    description: 'Complete home cleaning including dusting, vacuuming, mopping, kitchen and bathroom sanitization.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 120,
    active: true
  },
  {
    title: 'Commercial Cleaning',
    description: 'Office and commercial space cleaning tailored to your business needs. After-hours service available.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 180,
    active: true
  },
  {
    title: 'Deep Cleaning',
    description: 'Intensive deep cleaning for neglected areas, move-in/move-out, or seasonal refresh.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 240,
    active: true
  },
  {
    title: 'Carpet & Upholstery Cleaning',
    description: 'Steam cleaning and stain removal for carpets, sofas, and upholstery.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 90,
    active: true
  },
  {
    title: 'Post Construction Cleaning',
    description: 'Removal of construction debris, dust, and final detailing for newly built or renovated spaces.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 300,
    active: true
  },
  {
    title: 'Floor Care & Polishing',
    description: 'Scrubbing, polishing, and sealing for hardwood, tile, and marble floors.',
    image: 'https://images.unsplash.com/photo-1580256081112-e49377338b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 150,
    active: true
  },
  {
    title: 'Disinfection & Sanitization',
    description: 'Hospital-grade disinfection for homes and offices using EPA-approved products.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 60,
    active: true
  },
  {
    title: 'Pressure Washing',
    description: 'Exterior pressure washing for driveways, sidewalks, decks, and building surfaces.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 120,
    active: true
  },
  {
    title: 'Event Cleanup Services',
    description: 'Pre-event setup and post-event cleanup for parties, weddings, and corporate events.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 180,
    active: true
  }
]

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await Service.deleteMany({})   // optional: clears old ones
    await Service.insertMany(services)
    console.log('Services seeded successfully!')
    process.exit(0)
  })
  .catch(err => {
    console.error('Seeding failed:', err)
    process.exit(1)
  })
  