import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  const { name, email, message } = await request.json()
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'alexanderinnocentalexis9@gmail.com',
      subject: 'New message from Duwan Cleaning website',
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    })

    return NextResponse.json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Email send failed:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}