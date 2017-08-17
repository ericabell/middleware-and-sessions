const express = require('express');

let app = express();

app.use(function (req, res, next) {
    console.log("Request at", new Date());
    console.log("URL:", req.url);
    console.log("Query:", req.query, "\n");
    next();
});

app.get('/', (req,res,next) => {
  console.log('Root hit');
  res.send('Hello world!');
})

app.listen(3000, ()=>{console.log('Started on 3000.');});
