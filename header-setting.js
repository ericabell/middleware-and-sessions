const express = require('express');

let app = express();

const setServerName = function (key, value) {
  return function (req, res, next) {
      res.header(key, value);
      next();
  }
}

// we can set as many headers as we want with these calls
app.use(setServerName('Server', 'Dynamo 1000'));
app.use(setServerName('School', 'The Iron Yard'));

app.get('/', (req,res,next) => {
  res.send('Check Network tab in inspector. Look for the Response Header: "Server: Dynamo 1000"');
})

app.listen(3000, ()=>{console.log('Started on 3000.');});
