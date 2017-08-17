
var express = require('express');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
var session = require('express-session');

var app = express();


app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extend: true }));

app.use(function(req, res, next){
  /* Middleware logic.
  Example:
  Load a session / user
  Then, call next()
  */
  console.log('first middleware ' + 'request object:');
  console.log(req.session);
  next(); // Once the session is loaded, then the process moves on
  // to the next step in the pipeline. In this case, a route.
});

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}));

app.get('/', function(req, res, next){
  // req.session.user is available, since the middleware ran first and process a request for the session.
  // We can now use the req.session.user object in the view template.
  console.log('second middleware ' + 'request object:');
  console.log(req.session);

  res.send('check console. look at req.session before and after.');
});

app.listen(3000, () => {console.log('listen 3000');})
