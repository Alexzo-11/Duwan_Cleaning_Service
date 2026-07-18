import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL or file path
  duration: { type: Number, required: true }, // in minutes
  active: { type: Boolean, default: true },
})

export default mongoose.models.Service || mongoose.model('Service', serviceSchema)