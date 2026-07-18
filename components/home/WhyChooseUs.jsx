const features = [
  { icon: '🧑‍🔧', title: 'Trained Professionals', desc: 'Background‑checked and regularly trained cleaners.' },
  { icon: '🌿', title: 'Eco‑Friendly', desc: 'We use non‑toxic, biodegradable products safe for all.' },
  { icon: '📅', title: 'Flexible Booking', desc: 'Choose a time that fits your schedule, even weekends.' },
  { icon: '✅', title: '100% Satisfaction', desc: 'We don’t leave until you’re happy. Guaranteed.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-duwan-dark mb-6 reveal">Why Choose Us</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto reveal">We’re not just a cleaning service – we’re your partner for a healthier environment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300 reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-heading font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}