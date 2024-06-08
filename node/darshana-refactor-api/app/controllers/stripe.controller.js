const StripeServices = require('../services/stripe.services')
const { logger } = require('../helpers/logger')

module.exports = {
  payStripe: () => async (req, res) => {
    const pay = await StripeServices.checkoutSession()
    res.json({ status: true, data: pay })
  },

  webhook: () => async (req, res) => {
    const sig = req.headers['stripe-signature']
    let event

    try {
      event = await StripeServices.webhook(req.body, sig)
    } catch (error) {
      logger.error(
        '🚀 ~ file: stripe.controller.js:16 ~ webhook: ~ error:',
        error,
      )
      return res
        .status(400)
        .json({ status: false, message: `Webhook Error: ${error.message}` })
    }

    if (event.type !== 'checkout.session.completed') {
      logger.error(
        '🚀 ~ file: stripe.controller.js:33 ~ webhook: ~ event.type:',
        event.type,
      )
      return res.status(400).json({
        status: false,
        message: `Webhook Chekout Error: ${event.type}`,
      })
    }

    console.log('PAGO PROCESADO')
  },

  pay: () => async (req, res) => {
    const { token, amount } = req.body

    const response = await StripeServices.payment({ token, amount })
    if (!response.status) return res.status(400).json(response)

    return res.json(response)
  },
  checkout: () => async (req, res) => {
    const { body } = req

    const stripe = require('stripe')(process.env.STRIPE_API_SECRET)

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price: body.priceId,
            quantity: 1,
          },
        ],

        success_url: `${body.domain}?sessionId={CHECKOUT_SESSION_ID}`,

        cancel_url: `${body.domain}`,
      })

      return res.status(200).json({ url: session.url })
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error)
      return res
        .status(500)
        .json({ message: 'Error creating Stripe Checkout session' })
    }
  },
  prices: () => async (req, res) => {
    try {
      const stripe = require('stripe')(process.env.STRIPE_API_SECRET)
      const prices = await stripe.prices.list()
      console.log('precios de productos', prices)
      return res.status(200).json(prices.data)
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error)
      return res
        .status(500)
        .json({ message: 'Error creating Stripe Checkout session' })
    }
  },
}
