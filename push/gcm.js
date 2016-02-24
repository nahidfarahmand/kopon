var gcm = require('node-gcm'),
	apiKey = require('../config').gcm.key;

exports.sendNotification = function(coupon,tokens) { 
 
	var message = new gcm.Message({
	    contentAvailable: true,
	    data: {
	        'title': coupon.title,
	        'message': coupon.body
	    },
	    notification: {
	        title: "Hello from Kopon App"
	    }
	});

	var sender = new gcm.Sender(apiKey);
	
	//this is with no retry
	sender.sendNoRetry(message, { registrationTokens: tokens }, function(err, response) {
	  if(err) console.error(err);
	  else    console.log(response);
	});

};