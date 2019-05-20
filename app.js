var createError = require('http-errors') 
var express = require('express') 
var path = require('path') 
var cookieParser = require('cookie-parser') 
var logger = require('morgan') 

var cinemaRouter = require('./routes/cinema') 

var app = express() 

// view engine setup
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'pug') 


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})


app.use(logger('dev')) 
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser()) 
app.use(express.static(path.join(__dirname, 'public'))) 

app.use('/', cinemaRouter) 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)) 
}) 

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message 
  res.locals.error = req.app.get('env') === 'development' ? err : {} 

  // render the error page
  res.status(err.status || 500) 
  console.log("error" + err)
}) 

module.exports = app 
