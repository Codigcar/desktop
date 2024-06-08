const stripe = require('stripe')(process.env.STRIPE_SK)
const { logger } = require('../helpers/logger')
class StripeService {
  async checkoutSession({ name = 'name', price = 10, metadata = {} }) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: process.env.CURRENCY_CODE,
              product_data: {
                name,
                images: [
                  'https://cdn.whiz.pe/api/v2/image/15c5bc29-618d-46f6-93e7-b4193b72db9c/png',
                ],
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        metadata,
        mode: 'payment',
        success_url: `${process.env.WEB_URL}?success=true`,
        cancel_url: `${process.env.WEB_URL}?canceled=true`,
      })
      return session
    } catch (error) {
      logger.error(
        '🚀 ~ file: stripe.services.js:30 ~ StripeService ~ checkoutSession ~ error:',
        error,
      )
      return error
    }
  }

  webhook(payload, sig) {
    try {
      return stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WS)
    } catch (error) {
      logger.error(
        '🚀 ~ file: stripe.services.js:41 ~ StripeService ~ webhook ~ error:',
        error,
      )
      return error
    }
  }

  async payment({ token, amount }) {
    try {
      const data = await stripe.charges.create({
        source: token.id,
        amount,
        currency: 'usd',
      })
      return {
        status: true,
        data,
      }
    } catch (error) {
      logger.error(
        '🚀 ~ file: stripe.services.js:59 ~ StripeService ~ payment ~ error:',
        error,
      )
      return {
        status: false,
        message: `Payment ${error} `,
      }
    }
  }
}

module.exports = new StripeService()
