var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    businessSchema;

businessSchema = new Schema({
  name: {type:String, required: true},
  address: {type:String, required: true},
  phoneNumber: {type:String, required: true},
  verifiedAt: {type: Date, default: null},
  verificationDocumentUrl: {type: String, default: null},
  createdAt: {type: Date, default: Date.now},
  imageUrl: {type: String, default: null},
  coupons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'}]
});

businessSchema.methods.addCoupon = function(coupon) {
  this.coupons.push(coupon);
  this.save();
}

module.exports = mongoose.model('Business', businessSchema);
