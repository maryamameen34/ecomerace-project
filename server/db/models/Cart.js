const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Cart', CartSchema);
  