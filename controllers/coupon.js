var CouponSchema = require('../models/coupon');

exports.getAll = function(req, res) {    
    CouponSchema.find().sort({
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

exports.add = function(req, res) {
    var _name = req.query.name;
    var _percentage = req.query.percentage;
    var coupon = new CouponSchema({
    	name : _name,
    	percentage : _percentage
    });
    coupon.save(function (error, c){
    	if(error){
    		console.log(error);
    		res.send('error');
    	}
    	else {
    		res.send({coupon: c});
    	}
    });
};
