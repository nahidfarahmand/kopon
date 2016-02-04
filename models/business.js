var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    businessSchema;

businessSchema = new Schema({
  name: {type:String, required: true},
  address: String,
  phoneNumber: String,
  verifiedAt: {type: Date},
  verificationDocumentUrl: String,
  createdAt: {type: Date, default: Date.now},
  coupons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'}]
});

module.exports = mongoose.model('Business', businessSchema);
