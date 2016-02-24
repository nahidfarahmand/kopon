var gcmConfigSchema = require('../models/GCMConfig');

exports.add = function(req, res) {    
    var _username = req.body.username;    
    var _apid= req.body.apid;

    gcmConfigSchema.findOneAndUpdate({username:_username}, {apid: _apid}).exec(function(err, config){
        if(err) {
            res.send({success: false, error: err.message});
        } else if(config) {            
            res.set('Content-Type', 'application/json');
            res.send({success: true, gcmConfig: config});
        } else {
            var gcmConfig = new gcmConfigSchema({
                username : _username,
                apid: _apid
            });
            gcmConfig.save(function (err, g){
                if(err) {
                    res.send({success: false, error: err.message});
                }
                else {            
                    res.set('Content-Type', 'application/json');
                    res.send({success: true, gcmConfig: g});
                }
            });
        }
    });
};