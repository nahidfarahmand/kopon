/**
 * Module dependencies.
 */

var express        = require('express'),
    path           = require('path'),
    flash          = require('connect-flash'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    favicon        = require('static-favicon'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    config         = require('./config'),
    routes         = require('./routes'),
    passport       = require('passport'),    
    cookieParser   = require('cookie-parser'),
    expressSession = require('express-session');    


mongoose.connect(config.database.url);
mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

require('./controllers/login')(passport);

var app = express();

/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app
  .use(compress())
  .use(favicon())  
  .use(logger('dev'))
  .use(bodyParser())
  .use(cookieParser('s7az2mm'))
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'public')))      
  .use(expressSession({secret: 's7az2mm'}))  
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use(routes.indexRouter);

if (app.get('env') === 'development') {
  app.use(errorHandler());
}


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
