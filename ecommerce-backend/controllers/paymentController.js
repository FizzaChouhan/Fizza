import asyncHandler from "express-async-handler"
import Stripe from "stripe"

// @desc    Process Stripe payment
// @route   POST /api/payment/stripe
// @access  Private
const processStripePayment = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const { paymentMethodId, amount, currency = "usd" } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${req.headers.origin}/order-confirmation`,
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
      status: paymentIntent.status,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export { processStripePayment }
