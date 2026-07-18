export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function generateBookingId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = 'DWS-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function generateReceiptNumber() {
  return 'RCPT-' + Date.now().toString(36).toUpperCase()
}