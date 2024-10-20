const Payment = require("../../models/Payment");



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    await Payment.updateOne(
      { 'products.productId': session.metadata.product_id }, 
      { paymentStatus: 'Success' }
    );
  }

  res.status(200).send('Received webhook');
};
