// lib/mongodb.js
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// async function connectToDatabase() {
//   if (cached.conn) return cached.conn

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//     }).then((mongoose) => mongoose)
//   }
//   cached.conn = await cached.promise
//   return cached.conn
// }
async function connectToDatabase() {
  if (cached.conn) {
    console.log('✅ Using cached MongoDB connection')
    return cached.conn
  }
  
  if (!cached.promise) {
    console.log('🔄 Connecting to MongoDB Atlas...')
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ MongoDB Atlas connected successfully!')
      return mongoose
    })
  }
  
  cached.conn = await cached.promise
  return cached.conn
}

export default connectToDatabase   // <--- critical: default export must be the function