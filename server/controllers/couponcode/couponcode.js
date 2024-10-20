const express = require("express");
const Vendor = require("../../models/Vendor");
const catchAsyncError = require("../../middlwares/catchAsyncError");
const ErrorHandler = require("../../utils/ErrorHandler");
const { isSeller } = require("../../middlwares/auth");
const coupounCode = require("../../models/coupounCode");

exports.createCoupon = catchAsyncError(async (req, res, next) => {
  try {
    const isCouponCode = await coupounCode.find({
      name: req.body.name,
    });
    if (isCouponCode.length !== 0) {
      return next(new ErrorHandler("Coupoun code already exsists!", 400));
    }

    const coupouncode = await coupounCode.create(req.body);
    res.status(201).json({
      success: true,
      message: "Coupoun code created successfully",
      coupouncode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//get coupon codes for a shop
exports.getShopCouponCodes = catchAsyncError(async (req, res, next) => {
  try {
    const couponCodes = await coupounCode.find({ shopId: req.seller.id });
    res.status(200).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// delete coupon code of a shop
exports.deleteCouponCode = catchAsyncError(async (req, res, next) => {
  try {
    const couponCode = await coupounCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Coupon code deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.getCodeByName = catchAsyncError(async (req, res, next) => {
  try {
    const couponCode = await coupounCode.findOne({ name: req.params.name });
    if (!couponCode) {
      return next(new ErrorHandler("Coupon code not found", 404));
    }
    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
