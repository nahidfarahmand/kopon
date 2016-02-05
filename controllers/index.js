exports.index = function(req, res) {
    res.render('index',{title :'Kopon'});
};

exports.signup = function(req, res) {
    res.render('signup',{title :'Kopon'});
};

exports.login = function(req, res) {
    res.render('login',{title :'Kopon'});
};
