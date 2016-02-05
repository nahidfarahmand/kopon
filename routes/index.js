/**
 * Module dependencies
 */
var express = require('express'),
    passport = require('passport'),
    controllers = require('../controllers'),
    couponController = require('../controllers/coupon'),
    ownerController = require('../controllers/owner');
    //loginController = require('../controllers/login');

/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var indexRouter = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
 function isLoggedIn(req, res, next) {    
    if (req.isAuthenticated()){
      return next();    
    }
    res.redirect('/login');
}

indexRouter.route('/')
  .all(controllers.index);

indexRouter.route('/owner').get(isLoggedIn, function(req, res){
  res.render('owner/index', {
    user : req.user
  });
});

indexRouter.route('/signup').get(function(req, res){
    res.render('signup',{message: req.flash('signup-msg')});
  });

indexRouter.route('/login').get(function(req, res){
    res.render('login',{message: req.flash('login-msg')});
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
  
indexRouter.route('/post/coupon')
  .post(couponController.add);
indexRouter.route('/get/coupons')
  .get(couponController.getAll);

indexRouter.route('/post/owner')
  .post(ownerController.signup);
indexRouter.route('/get/owners')
  .get(ownerController.getAll);



exports.indexRouter = indexRouter;
