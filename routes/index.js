var express = require('express'),
    passport = require('passport'),
    couponController = require('../controllers/coupon'),
    ownerController = require('../controllers/owner');

var indexRouter = express.Router();

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();    
    }
    res.redirect('/');
}

indexRouter.route('/').get(function(req, res){
  res.redirect('/home')
});

indexRouter.route('/home').get(function(req, res){
  res.render('index',{
    title :'Kopon'
  });
});

indexRouter.route('/owner').get(isLoggedIn, function(req, res){
  res.render('owner/index', {
    user : req.user
  });
});

indexRouter.route('/login').post(passport.authenticate('local-login', {failureRedirect: '/login'}), function(req, res){
  if(req.user) {
    res.status(200).send({'success':1, 'user': req.user});
  } else {
    res.status(401).send({'success': 0});
  }
});

indexRouter.route('/signup').post(passport.authenticate('local-signup', {failureRedirect: '/signup'}), function(req, res){
  if(req.user) {    
    res.status(200).send({'success':1, 'user': req.user});
  } else {
    res.status(401).send({'success': 0});
  }
});

indexRouter.route('/logout').get(function(req, res) {
  req.logout();
  res.redirect('/');
});
  
indexRouter.route('/post/coupon').post(couponController.add);
indexRouter.route('/get/coupons').get(couponController.getAll);

indexRouter.route('/post/owner').post(ownerController.signup);
indexRouter.route('/get/owners').get(ownerController.getAll);

exports.indexRouter = indexRouter;
