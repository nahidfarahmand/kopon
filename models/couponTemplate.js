var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    couponTemplateSchema;

couponTemplateSchema = new Schema({
  template: String
});

module.exports = mongoose.model('CouponTemplate', couponTemplateSchema);
