const reviews = [
  {
    text: 'Duwan Cleaning transformed my office! Highly professional and thorough. Will recommend them to everyone.',
    author: 'Aisha M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    text: 'Best deep cleaning I have ever experienced. The team was punctual, friendly, and left my home sparkling.',
    author: 'Baba G.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    text: 'Reliable and affordable. I book them every month for my apartment. Always a pleasure.',
    author: 'Fatima K.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-duwan-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-duwan-dark text-center mb-12 reveal">What Our Clients Say</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory reveal">
          {reviews.map((r, i) => (
            <div key={i} className="snap-center shrink-0 w-full sm:w-96 bg-white rounded-2xl p-6 shadow-md">
              <p className="text-gray-600 italic mb-6">“{r.text}”</p>
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-duwan-dark">{r.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}