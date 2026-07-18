import mongoose from 'mongoose'

const receiptSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  receiptNumber: { type: String, unique: true, required: true },
  pdfUrl: { type: String }, // path to PDF file
  generatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Receipt || mongoose.model('Receipt', receiptSchema)