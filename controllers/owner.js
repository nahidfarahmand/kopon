var OwnerSchema = require('../models/owner');
var BusinessSchema = require('../models/business');

exports.getAllBusiness = function(req, res) {  
    //TODO: update to req.user.username
    var _user = req.user.username;  
    OwnerSchema.findOne({username:_user}).populate('businessCollection').exec(function (err, o) {
        if(err){
            res.send({success: false, error: err.message});
        }
        else {
            console.log(o);
            res.set('Content-Type', 'application/json');
            res.send({success: true, businesses: o.businessCollection});
            
        }
    });
};

exports.getBusiness = function(req, res) {      
    //TODO: update to req.user.username
    var _user = req.query.username;  
    var _id = req.query.id;
    OwnerSchema.findOne({username:_user}).select('businessCollection').findById(_id, function (err, b) {
      if(err){
            res.send({success: false, error: err.message});
        }
        else {
            res.set('Content-Type', 'application/json');
            res.send({success: true, busines: b});
        }
    });
    
};