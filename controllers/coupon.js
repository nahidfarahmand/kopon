var CouponSchema = require('../models/coupon'),
    BusinessSchema = require('../models/business'),
    TemplateSchema = require('../models/couponTemplate'),
    gcmConfigSchema = require('../models/GCMConfig'),
    Qrcode = require('qrcode'),
    Mongoose = require('mongoose'),
    Push = require('../push/gcm'),
    hat = require("hat");

exports.getTemplates = function(req, res) {    
    TemplateSchema.find({}, function(err,list){
        if(err){
            res.send({success: false, error: err.message});
        }
        else {            
            res.set('Content-Type', 'application/json');
            res.send({success: true, templates: list});
        }
    });    
};


exports.addTemplate = function(req,res){
    var template = new TemplateSchema({
        template: "hahaha"
    });
    template.save(function (err, c){                
                if(err) {
                    res.send({success: false, error: err});
                }
                else {
                    res.send({sucess: true})
                }
            });

};

exports.pushNotification = function(req,res){
    var coupon = CouponSchema.findById(req.body.id);
    //it needs this to remove _id from result
    gcmConfigSchema.find({},'-_id apid',function (err,configs) {
        if(err){
            res.send({success: false, error: err.message});
        }
        else 
        {  
            var tokens = [];

            for (var userKey in configs) 
                tokens.push(configs[userKey]['apid']);

            Push.sendNotification(coupon,tokens);
            res.send({success: true});

        }
    });
};

exports.add = function(req, res) {    
     
    var _title= req.body.title;    
    var _body= req.body.body;
    var _footer=req.body.footer;
    var _startDate = new Date(req.body.startDate);    
    var _duration = req.body.duration;
    var _code = req.body.code;
    var _businessId = req.body.businessId;
    var _now = new Date().getTime();

    var _endDate = new Date(req.body.startDate);
    _endDate.setTime(_endDate.getTime() + (_duration * 60 * 60 * 1000));

    var _couponTemplate = Mongoose.Types.ObjectId(req.body.couponTemplate);
    var PREFIX = "http://" + req.headers.host + "/";
    var _barcodeURL = 'coupons/coupon_' + hat() + '.png';

    var coupon = new CouponSchema({
       title: _title,
       body:_body,
       footer: _footer,
       startDate: _startDate,
       duration: _duration,
       code: _code,
       endDate: _endDate,
       couponTemplate: _couponTemplate
    });        

    Qrcode.save(_barcodeURL, coupon.code, function(err, written) {                        
        if(err) {
            res.send({success: false, error: err.message});
        } else {            
            coupon.barcodeURL = PREFIX + _barcodeURL;            
            coupon.save(function (err, c){                
                if(err) {
                    res.send({success: false, error: err});
                }
                else {            
                    BusinessSchema.findById(_businessId, function(err, b) {
                        if(err){                    
                            res.send({success: false, error: err.message});
                        }
                        else {                
                            b.addCoupon(c);
                            res.set('Content-Type', 'application/json');
                            res.send({success: true, coupon: c});
                        }
                    });
                }
            });            
        }                        
    });

       
}

