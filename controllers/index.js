exports.index = function(req, res) {
    res.render('index',{title :'Polymer App'});
};

exports.signup = function(req, res) {
    res.render('signup',{title :'Polymer App'});
};

exports.login = function(req, res) {
    res.render('login',{title :'Polymer App'});
};
