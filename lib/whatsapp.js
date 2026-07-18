import axios from 'axios'

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN
const PHONE_ID = process.env.WHATSAPP_PHONE_ID

export async function sendWhatsAppMessage(to, templateName, params = {}) {
  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: Object.entries(params).map(([key, value]) => ({
                type: 'text',
                text: value,
              })),
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('WhatsApp send failed:', error.response?.data || error.message)
  }
}

// Predefined template helpers
export async function notifyBookingSubmitted(phone, name, bookingId) {
  await sendWhatsAppMessage(phone, 'booking_submitted', {
    name,
    bookingId,
  })
}

export async function notifyBookingApproved(phone, name, bookingId) {
  await sendWhatsAppMessage(phone, 'booking_approved', {
    name,
    bookingId,
  })
}

export async function notifyCleanerAssigned(phone) {
  await sendWhatsAppMessage(phone, 'cleaner_assigned', {})
}

export async function notifyJobCompleted(phone, name) {
  await sendWhatsAppMessage(phone, 'job_completed', { name })
}