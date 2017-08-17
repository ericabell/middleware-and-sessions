var express = require('express')
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')

// create a write stream (in append mode)
// we have to have something to pass to stream for morgan...
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'morgan.log'), {flags: 'a'})


var app = express()


// let's look at app.get('env') first...
console.log(app.get('env'));

// we can force change it:
app.set('env', 'production');

console.log(app.get('env'));

if (app.get('env') == 'production') {
  app.use(morgan('common', {
    skip: function(req, res) {
      // return res.statusCode < 400
      return res.statusCode < 200
    },
    // stream: __dirname + '/../morgan.log'
    stream: accessLogStream
  }));
} else {
  app.use(morgan('dev'));
}


app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(3000, ()=>{console.log('listening 3000');})
