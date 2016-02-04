var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema,
    ownerSchema;

ownerSchema = new Schema({
  username: {type:String, required: true},
  password: {type:String, required: true},
  email: {type:String, required: true},  
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  phoneNumber: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  lastLogin: {type:Date, default: Date.now},
  businessCollection: [{type: mongoose.Schema.Types.ObjectId, ref: 'Business'}]
});

ownerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
ownerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Owner', ownerSchema);
