'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoginForm from '@/components/forms/LoginForm'
import OTPVerification from '@/components/forms/OTPVerification'

export default function LoginPage() {
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-heading font-bold text-duwan-dark mb-8 text-center">
        Login / Register
      </h1>
      {step === 'phone' ? (
        <LoginForm onOtpSent={(p) => { setPhone(p); setStep('otp') }} />
      ) : (
        <OTPVerification phone={phone} onSuccess={() => router.push(redirect)} />
      )}
    </div>
  )
}