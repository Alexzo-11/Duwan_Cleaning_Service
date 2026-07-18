export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 reveal">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-duwan-dark mb-6">Who We Are</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Duwan Cleaning Services is a premium cleaning company based in Maiduguri. We bring years of expertise, eco‑friendly products, and a passion for perfection to every job.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From regular housekeeping to post‑construction cleanup, our trained team ensures your space is immaculate and safe.
          </p>
        </div>
        <div className="md:w-1/2 reveal">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Cleaning team"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}