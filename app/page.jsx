import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import ServicesGrid from '@/components/home/ServicesGrid'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import BookingCTA from '@/components/home/BookingCTA'
import Testimonials from '@/components/home/Testimonials'
import ContactInfo from '@/components/home/ContactInfo'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesGrid />
      <WhyChooseUs />
      <BookingCTA />
      <Testimonials />
      <ContactInfo />
    </>
  )
}