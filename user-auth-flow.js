var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var mongoDBStore = require('connect-mongodb-session')(session);

var app = express()
var store = new mongoDBStore(
  {
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
  }
);

store.on('error', (e) => {
  assert.ifError(e);
  assert.ok(false);
})

// before the session middleware, req.session doesn't exist.
app.use( (req, res, next) => {
  console.log('Before app.use(session), req.session is always undefined');
  console.log(`req.session = ${req.session}`);
  next();
})

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 //1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  console.dir(`req.session.views = ${req.session.views}`);

  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

app.get('/', (req, res) => {
  res.send('you should look at /foo and /bar for the counters.')
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})


app.listen(3000, () => {console.log('listening 3000');});
