import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g., "09:00"
  notes: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'in_progress', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
})

// Prevent double booking for same service/time (simplified)
bookingSchema.index({ date: 1, time: 1, serviceId: 1 }, { unique: true })

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema)