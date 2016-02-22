var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    couponSchema;

couponSchema = new Schema({
  title: {type:String, required: true},
  body: {type:String, required: true},
  footer: {type:String, required: true},
  startDate: {type:Date, required: true},
  duration: {type:Number, required:true},
  barcodeURL: {type:String, default: ""},
  code: {type:String, required: true},
  endDate: {type:Date, required:true},
  createdAt: {type: Date, default: Date.now},
  couponTemplate: {type: mongoose.Schema.Types.ObjectId, ref: 'CouponTemplate', required: true}
});

module.exports = mongoose.model('Coupon', couponSchema);
