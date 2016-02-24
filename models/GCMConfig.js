var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    gcmConfigSchema;

gcmConfigSchema = new Schema({
  username: {type:String, required: true, unique: true},
  apid: {type:String, required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('GCMConfig', gcmConfigSchema);
