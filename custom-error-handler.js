const express = require('express');

let app = express();

// The default error handler is called with a stack
// trace if we don't handle the error

// create a custom error message, pass it through
// next() and do nothing with it.

app.get('/', (req, res, next) => {
  // we are going to send some headers, but not a full response
  // before calling next() with our custom message
  res.set('Content-Type', 'text/plain');

  if(true) {
    next('Our custom error message')
  } else {
    res.send('This will never execute!')
  }
});

// here's our custom error handler....
app.use( (err, req, res, next) => {
  console.log('error handler, err = ' + err);
  if (res.headersSent) {
    // return next(err) // why is return called and not just next(err)?
    console.log('we detected that headersSent');
    next(err);
  }
  res.status(500)
  //res.render('error', { error: err })
  res.send('our custom error handler function?')
})

app.listen(3000, ()=>{console.log('Started on 3000.');});
