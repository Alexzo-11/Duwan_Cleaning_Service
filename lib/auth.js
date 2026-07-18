import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const alg = 'HS256'
const COOKIE_NAME = 'auth-token'

export async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function getAuthToken() {
  const cookieStore = await cookies()   // await here
  return cookieStore.get(COOKIE_NAME)?.value
}

export async function setAuthCookie(token) {
  const cookieStore = await cookies()   // await here
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function deleteAuthCookie() {
  const cookieStore = await cookies()   // await here
  cookieStore.delete(COOKIE_NAME)
}