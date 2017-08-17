
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = {};
var app = express();

app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extend: true }));


// In this example '/post' does not exist.
// This request will cause an error, which will be handled by the * error path.
app.get('/post', function(req, res, next) {
  Post.findById(1234).then(function(post, err){
    if (err) {
      return next(err);
    }
    if(!post) {
      var notFound = new Error('Post not found!');
      notFound.status = 404;
      return next(notFound);
    }
    res.send(post);
  });
});

app.get('*', function(req, res, next) { // We handle any GET request path by assigning a path of *
  console.log('handle any get request...');
  var err = new Error();
  err.status = 404;
  next(err); // Pass the error to the error middleware.
});

// Error middleware:
// Error middleware order matters. Keep them together and consecutive, below the routes.
// Error middleware is different from a regular middleware.
// It needs four arguments: err, req, res and next.
app.use(function(err, req, res, next) {
  console.log('error middleware: ' + err.status);
  if(err.status !== 404) {
    return next();
  }
  console.log('about to send the error message back to the browser');
  console.log('error message is: ' + err.message);
  // I guess we forgot to set the error message, let's set one
  err.message = 'This is my custom error message';
  res.send(err.message);
});

// IF the error is not a 404, you can specify another status.
app.use(function(err, req, res, next) {
  // during development we may want to print the errors:
  console.log(err.stack);  // but this WON'T print anything, since we never set err.stack
  // Log error for debugging.
  log.error(err, req);
  res.status(500);
  res.send('Oops, we broke the internet!');
});

app.listen(3000);
