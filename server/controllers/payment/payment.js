const dotenv = require("dotenv");
const Order = require("../../models/Order");
const catchAsyncError = require("../../middlwares/catchAsyncError");
const Payment = require("../../models/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config({ path: "../../.env" });

exports.createCheckout = catchAsyncError(async (req, res, next) => {
  const { products } = req.body;

  const lineItems = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100), // Convert to cents
        product_data: {
          name: product.name,
        },
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhostS:3000/cancel`,
  });
  // Save payment details to MongoDB
  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const payment = new Payment({
    products: products.map((product) => ({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    })),
    totalAmount,
    paymentStatus: "Success",
  });

  await payment.save();

  res.json({ id: session.id });
});

exports.paymentProcess = catchAsyncError(async (req, res, next) => {
  const { amount, items, userId } = req.body;

  // Validate amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  // Create payment intent
  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    metadata: {
      company: "Becodemy",
    },
  });

  // Save order to the database
  const order = await Order.create({
    user: userId,
    items: items,
    paymentInfo: {
      id: myPayment.id,
      status: myPayment.status,
      amount: myPayment.amount,
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
    order,
  });
});


exports.getPaymentDetails = catchAsyncError(async (req, res, next) => {
  const { sessionId } = req.params; // Extract sessionId from the URL

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  // Find the payment record by session ID
  const payment = await Payment.findById(sessionId);

  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }

  res.status(200).json(payment);
});
