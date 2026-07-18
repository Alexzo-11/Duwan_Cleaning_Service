import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-heading font-bold text-duwan-light mb-4">Duwan Cleaning</h3>
          <p className="text-gray-400 mb-4">
            Professional cleaning services for homes and businesses in Maiduguri, Borno State.
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="https://instagram.com/Duwan_Cleaning" target="_blank" className="hover:text-duwan-light transition-colors">📷</a>
            <a href="https://tiktok.com/@Duwan.cleaning.se" target="_blank" className="hover:text-duwan-light transition-colors">🎵</a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-duwan-light transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-duwan-light transition-colors">Services</Link></li>
            <li><Link href="/book" className="hover:text-duwan-light transition-colors">Book Now</Link></li>
            <li><Link href="/#contact" className="hover:text-duwan-light transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Galadima Junction, Maiduguri</li>
            <li>📞 0810 650 9069</li>
            <li>✉️ alexanderinnocentalexis9@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Duwan Cleaning Services. All rights reserved.
      </div>
    </footer>
  )
}