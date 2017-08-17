const express = require('express');

let app = express();

app.use((req,res,next) => {
  // fake out so that we can control next route
  // by changing the following to true or false
  console.log('set up fake data');
  req.user = {registered: true};
  next();
})

app.get('/foo',
function checkRegistration (req, res, next){
  console.log('In checkRegistration()');
  if(!req.user.registered){
    // If user has not registered, skip to the next route.
    // getRegistration will not be executed.
    // next('route')
    res.send('ended with checkRegistration()')
  }
  next('route');
}, function getRegistration (req, res, next) {
    console.log('In getRegistration()');
    res.send('ended with getRegistration')
  // Registration.find(function (err, data){
  //   if (err) return next(err)
  //   res.json(data)
  // });
});

app.use((req,res,next) => {
  res.send('In all catcher route.')
})

app.listen(3000, ()=>{console.log('Started on 3000.');});
