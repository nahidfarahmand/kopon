var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    gcmConfigSchema;

userSchema = new Schema({
  username: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  email: {type:String, required: true, unique: true},  
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  phoneNumber: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);
