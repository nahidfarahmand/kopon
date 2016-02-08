var BusinessSchema = require('../models/business');
var OwnerSchema = require('../models/owner');

exports.getAll = function(req, res) {    
    BusinessSchema.find().sort({
    	createdAt: 1
    }).exec(function(err,list){
    	if(err){
    		res.send('error');
    	}
    	else {
    		res.set('Content-Type', 'application/json');
    		res.send(list);
    	}
    });    
};

exports.getAllCoupons = function(req, res) {  
    
    var _id = req.query.id;  
    BusinessSchema.findById(_id).select('coupons').sort({
        createdAt: 1
    }).exec(function(err,list){
        if(err){
            res.send({success: false, error: err.message});
        }
        else {
            res.set('Content-Type', 'application/json');
            res.send({success: true, coupons: list});
            
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

exports.deleteBusiness = function(req, res) {          
    var _user = req.user.username;  
    var _id = req.params.id;    
    BusinessSchema.findByIdAndRemove(_id, function(err){
        if(err){
            res.send({success: false, error: err.message});
        }
        else
        {
            OwnerSchema.findOne({username:_user}).exec(function (err, o) {
                if(err){
                    res.send({success: false, error: err.message});
                }
                else {
                    o.removeBusiness(_id);
                    res.set('Content-Type', 'application/json');
                    res.send({success: true});
                }
            });
        }
    });    
};

exports.add = function(req, res) {    
    var _name = req.body.name;    
    var _address= req.body.address;
    var _phoneNumber =req.body.phoneNumber;
    var _user = req.user.username;

    var business = new BusinessSchema({
        name : _name,
        address: _address,
        phoneNumber: _phoneNumber
    });
    business.save(function (err, b){
        if(err) {
            res.send({success: false, error: err.message});
        }
        else {            
            OwnerSchema.findOne({'username': _user}).exec(function(err, o) {
                if(err){                    
                    res.send({success: false, error: err.message});
                }
                else {                
                    o.addBusiness(b);
                    res.set('Content-Type', 'application/json');
                    res.send({success: true, business: b});
                
                }
            });
        }
    });   
}
