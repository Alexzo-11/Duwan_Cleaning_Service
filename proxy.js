// proxy.js
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function proxy(request) {
  const token = request.cookies.get('auth-token')?.value
  const url = request.nextUrl.clone()

  // Helper to verify token and get payload
  const verify = async () => {
    if (!token) return null
    try {
      const { payload } = await jwtVerify(token, secret)
      return payload
    } catch {
      return null
    }
  }

  // Protect /dashboard and /admin
  if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    const payload = await verify()
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
    // Admin protection
    if (url.pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}