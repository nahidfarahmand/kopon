var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema,
    userSchema;

userSchema = new Schema({
  username: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  email: {type:String, required: true, unique: true},  
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  phoneNumber: {type: String, required: true},
  lastLogin: {type:Date, default: Date.now},
  role: {type: String, default: 'User'},
  usedCoupons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'}],
  createdAt: {type: Date, default: Date.now}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
