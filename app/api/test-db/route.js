import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'

export async function GET() {
  try {
    const mongoose = await connectToDatabase()
    
    // Connection states: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    const stateMap = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting',
    }
    
    return NextResponse.json({
      status: stateMap[mongoose.connection.readyState] || 'Unknown',
      database: mongoose.connection.db.databaseName,
      host: mongoose.connection.host,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Connection failed', message: error.message },
      { status: 500 }
    )
  }
}