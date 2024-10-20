const mongoose = require("mongoose")



const VendorSchema = new mongoose.Schema({
    username : {
        type : String ,
        require : false ,
    },
    first_name : {
        type : String ,
        require : true ,
        max : [8 , "first name should be smaller then 8 characters"],
        min : [3 , 'first name should be greater then 3 characters']
    },
    last_name : {
        type : String ,
        require : true ,
        max : [8 , "first name should be smaller then 8 characters"],
        min : [3 , 'first name should be greater then 3 characters']
    },
    email : {
        type : String ,
        require : true ,
        max : [250 , "first name should be smaller then 250 characters"],
        min : [8 , 'first name should be greater then 8 characters']
    },
    password : {
        type : String ,
        require : true ,
        max : [30 , "first name should be smaller then 30 characters"],
        min : [8 , 'first name should be greater then 8 characters']
    },
    confirm_password : {
        type : String ,
        require : true ,
        max : [30 , "first name should be smaller then 8 characters"],
        min : [8 , 'first name should be greater then 3 characters']
    },
    storeName: { type: String, required: true },
    address: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
      phoneNumber: { type: String }
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    earnings: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Vendor', VendorSchema);
  