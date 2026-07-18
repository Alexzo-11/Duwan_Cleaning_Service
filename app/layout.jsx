import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ScrollReveal'


export const metadata = {
  title: 'Duwan Cleaning Services - Professional Cleaning',
  description: 'Best cleaning services in Maiduguri, Borno State. Residential, commercial, deep cleaning & more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <ScrollReveal />
        <Footer />
      </body>
    </html>
  )
}