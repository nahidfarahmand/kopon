var OwnerSchema = require('../models/owner');
    BusinessSchema = require('../models/business'),
    multer  = require('multer'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'verification_documents/')
        },
        filename: function (req, file, cb) {          
            cb(null, 'verification_document_' + req.body.id + ".pdf");
        }
    }),
    upload = multer({ storage: storage});

exports.getAllBusiness = function(req, res) {  
    //TODO: update to req.user.username
    var _user = req.user.username;  
    OwnerSchema.findOne({username:_user}).populate('businessCollection').exec(function (err, o) {
        if(err){
            res.send({success: false, error: err.message});
        }
        else {            
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

exports.getUser = function(req, res) {      
    //TODO: update to req.user.username
    var _user = req.user.username; 
    OwnerSchema.findOne({username:_user}, function (err, u) {
      if(err){
            res.send({success: false, error: err.message});
        }
        else {
            res.set('Content-Type', 'application/json');
            var _userInfo = u;
            _userInfo.password = "";
            res.send({success: true, userInfo : _userInfo});
        }
    });  
};

exports.uploadDocument = function(req, res, next) {
    var _id = req.body.id;    
    var PREFIX = "http://" + req.headers.host + "/";
    BusinessSchema.findByIdAndUpdate(_id, {
            $set: {
                verificationDocumentUrl: PREFIX + req.file.path
            }
        }, function(err, b) {
        if(err) {
            res.send({success: false, error: err.message});
        } else {
            b.verificationDocumentUrl = PREFIX + req.file.path;
            res.set('Content-Type', 'application/json');
            res.send({success: true, business: b});
        }
    });
}