var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    couponSchema;

couponSchema = new Schema({
  title: String,
  body: String,
  footer: String,
  startDate: {type:Date},
  duration: Number,
  barcodeURL: String,
  code: String,
  isValid: Boolean,
  createdAt: {type: Date, default: Date.now},
  couponTemplate: {type: mongoose.Schema.Types.ObjectId, ref: 'CouponTemplate'}
});

module.exports = mongoose.model('Coupon', couponSchema);
