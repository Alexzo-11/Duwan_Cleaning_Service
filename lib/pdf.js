import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

export async function generateReceiptPDF(booking, customer, service, receiptNumber) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 })
  const filePath = path.join(process.cwd(), 'public', 'receipts', `receipt-${receiptNumber}.pdf`)
  const writeStream = fs.createWriteStream(filePath)
  doc.pipe(writeStream)

  // Company header
  doc.fontSize(20).font('Helvetica-Bold').text('Duwan Cleaning Services', { align: 'center' })
  doc.fontSize(10).font('Helvetica').text('Galadima Junction Beside NNPC Filling Station, Maiduguri, Borno State', { align: 'center' })
  doc.text('Phone: 0903 003 3191 | Email: duwancleanings@gmail.com', { align: 'center' })
  doc.moveDown()

  // Divider
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
  doc.moveDown()

  // Receipt info
  doc.fontSize(14).font('Helvetica-Bold').text(`Receipt #${receiptNumber}`)
  doc.fontSize(11).font('Helvetica')
  doc.text(`Date: ${new Date().toLocaleDateString()}`)
  doc.text(`Booking ID: ${booking.bookingId}`)
  doc.text(`Completion Date: ${new Date().toLocaleDateString()}`)
  doc.moveDown()

  // Customer info
  doc.font('Helvetica-Bold').text('Customer Details')
  doc.font('Helvetica')
  doc.text(`Name: ${customer.name}`)
  doc.text(`Phone: ${customer.phone}`)
  if (customer.email) doc.text(`Email: ${customer.email}`)
  doc.moveDown()

  // Service info
  doc.font('Helvetica-Bold').text('Service Details')
  doc.font('Helvetica')
  doc.text(`Service: ${service.title}`)
  doc.text(`Duration: ${service.duration} minutes`)
  doc.text(`Address: ${booking.address}`)
  doc.moveDown()

  // QR Code
  const qrData = `Booking: ${booking.bookingId}\nReceipt: ${receiptNumber}\nVerified by Duwan Cleaning`
  const qrImage = await QRCode.toDataURL(qrData)
  doc.image(qrImage, { fit: [80, 80], align: 'center' })
  doc.moveDown()

  // Signature area
  doc.font('Helvetica-Bold').text('Authorized Signature', { align: 'right' })
  doc.moveDown(2)
  doc.fontSize(8).font('Helvetica').text('Thank you for choosing Duwan Cleaning Services!', { align: 'center' })

  doc.end()

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(`/receipts/receipt-${receiptNumber}.pdf`))
    writeStream.on('error', reject)
  })
}