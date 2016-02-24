var jwt = require('jwt-simple');

module.exports = function(req, res, next) {	
    if(req.method == 'OPTIONS') next();
    var token = req.body.token;
    if (token) {
        try {
            var decoded = jwt.decode(token, 'Atoole65!');
            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            } else {
                next();
            }
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
        return;
    }
};