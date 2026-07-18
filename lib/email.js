import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendReceiptEmail(toEmail, subject, pdfPath) {
  await transporter.sendMail({
    from: `"Duwan Cleaning" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: subject,
    text: 'Thank you for your business. Please find your cleaning service receipt attached.',
    attachments: [
      {
        filename: `receipt-${Date.now()}.pdf`,
        path: pdfPath,
      },
    ],
  })
}