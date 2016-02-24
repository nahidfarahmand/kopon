var express = require('express'),
    passport = require('passport'),
    fs = require('fs'),
    couponController = require('../controllers/coupon'),
    ownerController = require('../controllers/owner'),
    businessController = require('../controllers/business'),
    gcmConfigController = require ('../controllers/GCMConfig');

var indexRouter = express.Router();

var appHelpers = {};
appHelpers.sendFile = function(pathname, res) {    
    var file = fs.createReadStream(pathname);
    file.on('data', res.write.bind(res));
    file.on('close', function () {
        res.end();
    });
    file.on('error', function (error) {
        console.log(error);
    })
};

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

indexRouter.route('/verification_documents/*').get(function(req, res){    
  appHelpers.sendFile('.' + req.url, res);
});

indexRouter.route('/coupons/*').get(function(req, res){    
  appHelpers.sendFile('.' + req.url, res);
});


indexRouter.route('/login').post(passport.authenticate('local-login', {failureRedirect: '/login'}), function(req, res){
  if(req.user) {
    res.status(200).send({'success':true, 'user': req.user});
  } else {
    res.status(401).send({'success': false});
  }
});

indexRouter.route('/signup').post(passport.authenticate('local-signup', {failureRedirect: '/signup'}), function(req, res){
  if(req.user) {    
    res.status(200).send({'success':true, 'user': req.user});
  } else {
    res.status(401).send({'success': false});
  }
});

indexRouter.route('/user/login').post(passport.authenticate('user-login', {failureRedirect: '/user/login'}), function(req, res){    
  if(req.user) {
    res.status(200).send({'success':true, 'user': req.user});
  } else {
    res.status(401).send({'success': false});
  }
});

indexRouter.route('/user/signup').post(passport.authenticate('user-signup', {failureRedirect: '/user/signup'}), function(req, res){
  if(req.user) {    
    res.status(200).send({'success':true, 'user': req.user});
  } else {
    res.status(401).send({'success': false});
  }
});

indexRouter.route('/logout').get(function(req, res) {
  req.logout();
  res.redirect('/');
});
//indexRouter.route('/api/user/*').all(require('../middlewares/validateRequest'));
indexRouter.route('/user/api/register/phone').post(gcmConfigController.add);

indexRouter.route('/owner/api/coupon').post(couponController.add);
//indexRouter.route('/owner/api/coupon/:id').get(businessController.getCoupon);
indexRouter.route('/owner/api/coupons/:id').get(businessController.getCoupons);
indexRouter.route('/owner/api/templates').get(couponController.getTemplates);
indexRouter.route('/owner/api/addtemplate').get(couponController.addTemplate);

indexRouter.route('/owner/api/user').get(ownerController.getUser);
indexRouter.route('/coupon/api/push').post(couponController.pushNotification);

indexRouter.route('/owner/api/business').post(businessController.add);
indexRouter.route('/owner/api/business/:id').delete(businessController.deleteBusiness);
indexRouter.route('/owner/api/business/:id').get(ownerController.getBusiness);
indexRouter.route('/owner/api/businesses').get(ownerController.getAllBusiness);
indexRouter.route('/owner/upload/document').post(upload.single('document'), ownerController.uploadDocument);

exports.indexRouter = indexRouter;
