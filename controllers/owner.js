var OwnerSchema = require('../models/owner');
var bcrypt = require('bcrypt-nodejs');

exports.getAll = function(req, res) {    
    OwnerSchema.find().sort({
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

exports.signup = function(req, res) {
    console.log(req.body);
    var _username = req.body.username;
    var _firstname = req.body.firstname;
    var _lastname = req.body.lastname;
    var _phonenumber = req.body.phonenumber;
    var _email = req.body.email;
    var _password = req.body.password;
    var saltedPassword = bcrypt.hashSync(_password);

    //TODO: validate doe snot already exist

    var owner = new OwnerSchema({
    	username : _username,
    	password : saltedPassword,
        email: _email,
        firstName: _firstname,
        lastName: _lastname,
        phoneNumber: _phonenumber
    });
    owner.save(function (err){
    	if(err){    		
    		res.send({'success': 0});
    	}
    	else {
    		res.send({'success': 1});
    	}
    });
};


exports.getBusiness = function(req, res) {  
    var _user = req.query.username;  
    OwnerSchema.find({username:_user}).select('businessCollection').sort({
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
