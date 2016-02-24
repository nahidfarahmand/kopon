var gcm = require('node-gcm');

exports.sendNotification = function(coupon,tokens) { 
 
	var message = new gcm.Message({
	    contentAvailable: true,
	    data: {
	        'title': coupon.title,
	        'body': coupon.body
	    },
	    notification: {
	        title: "Hello from Kopon App"
	    }
	});


	var sender = new gcm.Sender('AIzaSyCQsXqLk3dMBkAnSk-AbpZwgTfGdDgdJg4');
	
	//this is with no retry
	sender.sendNoRetry(message, { registrationTokens: tokens }, function(err, response) {
	  if(err) console.error(err);
	  else    console.log(response);
	});

};