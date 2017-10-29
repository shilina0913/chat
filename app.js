var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var message = require('./routes/message');
var mysql=require('./db.js');
var multipart=require("connect-multiparty");


var app = express();
var multipartMiddleware = multipart();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/index', function (req,res) {
    res.sendfile("./views/index.html");
});
app.use('/users', users);

app.use('/sendMsg', urlencodedParser,function (req) {
    console.log(req.body.msg);
    var sql="insert into message(info,user_id,room_id,is_valid) values("+req.body.msg+",1,1,1)";
    mysql.query(sql,function (err,res) {
        if(err){
            console.log(err);
        }
        res.sendfile("./views/index.html");
    })


});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
