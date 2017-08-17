
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencode({ extend: true }));

app.use(function(req, res, next){
  /* Middleware logic.
  Example:
  Load a session / user
  Then, call next()
  */
  next(); // Once the session is loaded, then the process moves on
  // to the next step in the pipeline. In this case, a route.
});

app.get('/', function(req, res, next){
  // req.session.user is available, since the middleware ran first and process a request for the session.
  // We can now use the req.session.user object in the view template.
  res.render('index', {title: 'home'});
});
