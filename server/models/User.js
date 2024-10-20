// User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: [8, "First name should be smaller than 8 characters"],
      minlength: [3, "First name should be greater than 3 characters"],
    },
    last_name: {
      type: String,
      required: true,
      maxlength: [8, "Last name should be smaller than 8 characters"],
      minlength: [3, "Last name should be greater than 3 characters"],
    },
    email: {
      type: String,
      required: true,
      maxlength: [250, "Email should be smaller than 250 characters"],
      minlength: [8, "Email should be greater than 8 characters"],
    },
    password: {
      type: String,
      required: true,
      maxlength: [30, "Password should be smaller than 30 characters"],
      minlength: [8, "Password should be greater than 8 characters"],
    },
    address: [
      {
        fullName: { type: String },
        addressLine1: { type: String },
        addressLine2: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String },
        phoneNumber: { type: String },
      },
    ],
    phone_number: {
      type: String,
      required: false,
      maxlength: [8, "Phone number should be smaller than 8 characters"],
      minlength: [3, "Phone number should be greater than 3 characters"],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer", "seller"],
      default: "customer",
    },
    paymentInformation: { type: Object },
    profile_pic: { type: String },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    isBlocked: { type: Boolean, default: false },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    verificationToken: String,
    verificationCode: String,
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
