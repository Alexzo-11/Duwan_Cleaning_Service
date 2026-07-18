import Link from 'next/link'

export default function BookingCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        alt="Cleaning"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-duwan-dark/70" />
      <div className="relative z-10 max-w-3xl mx-auto text-center text-white px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 reveal">Ready for a Spotless Space?</h2>
        <p className="text-lg mb-8 reveal">Book your cleaning in 60 seconds. We’ll handle the rest.</p>
        <Link href="/book" className="inline-block bg-duwan-royal hover:bg-duwan-light text-white font-semibold py-3 px-10 rounded-full transition-colors shadow-lg reveal">
          Book Now
        </Link>
      </div>
    </section>
  )
}