'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
module.exports = {
  create: () => (request, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const sig = request.headers['stripe-signature']
      const stripe = require('stripe')(process.env.STRIPE_API_SECRET)
      const { MODELS } = require('../helpers/enums')
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
      let event
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret,
        )
        switch (event.type) {
          case 'checkout.session.completed':
            // eslint-disable-next-line no-case-declarations
            const checkoutSessionCompleted = event.data.object
            yield MODELS.ValidationCheckoutModel.create({
              email: checkoutSessionCompleted.customer_details.email,
              verification_number: 3,
              is_per_month: true,
              payment_link: checkoutSessionCompleted.payment_intent,
            })
            res.status(200).json({ message: 'checkout valid' })
            // Then define and call a function to handle the event checkout.session.completed
            break
          // ... handle other event types
          default:
            console.log(`Unhandled event type ${event.type}`)
            return res.status(400).send(`Webhook Error: ${event.type}`)
        }
      } catch (err) {
        console.log('🚀 ~ err:', err)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
    }),
  details: () => (request, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { MODELS } = require('../helpers/enums')
      try {
        const getCheckouts = yield MODELS.ValidationCheckoutModel.findAll({
          where: {
            email: request.query.email,
          },
          order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({ data: getCheckouts })
      } catch (err) {
        console.log('🚀 ~ err:', err)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
    }),
  checkout: () => (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { body } = req
      const stripe = require('stripe')(process.env.STRIPE_API_SECRET)
      try {
        const session = yield stripe.checkout.sessions.create({
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
    }),
  prices: () => (_req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const stripe = require('stripe')(process.env.STRIPE_API_SECRET)
        const prices = yield stripe.prices.list()
        return res.status(200).json(prices.data)
      } catch (error) {
        console.error('Error creating Stripe Checkout session:', error)
        return res
          .status(500)
          .json({ message: 'Error creating Stripe Checkout session' })
      }
    }),
  verify: () => (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { sessionId } = req.query
      const stripe = require('stripe')(process.env.STRIPE_API_SECRET)
      try {
        if (!sessionId) {
          throw 'no hay sesion id'
        }
        const session = yield stripe.checkout.sessions.retrieve(sessionId)
        return res.status(200).json({ payment_status: session.payment_status })
      } catch (error) {
        console.error('Error creating Stripe Checkout session:', error)
        return res
          .status(500)
          .json({ message: 'Error creating Stripe Checkout session' })
      }
    }),
}
