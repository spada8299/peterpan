var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

// Database
var monk = require('monk');
var mongodb_URI = process.env.MONGODBURI || 'mongodb://localhost:27017/test';

var db = monk(mongodb_URI);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
var upload = multer({ //multer settings
                storage: storage,
                dest: './uploads/'
            }).single('file');

app.use('/', routes);
app.use('/users', users);

/** API path that will upload the files */
    app.post('/upload', function(req, res) {
        var exceltojson; //Initialization
        upload(req,res,function(err){
            if(err){
                 console.log(err);
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
              console.log('err: No file passed');
                return;
            }
            //start convert process
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                    input: req.file.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                      console.log(err);
                        return res.json({error_code:1,err_desc:err, data: null});
                    } 
                    try {
                        fs.unlinkSync(req.file.path);
                    } catch(e) {
                        //error deleting the file
                        console.log(e);
                    }
                    var allNum = [];
                    var list = db.get('numList');
                    for (var i = 0; i <= result.length - 1; i++) {
                      if (result[i].num === '') {
                        continue;
                      } else {
                        allNum.push({ num: result[i].num});
                      }
                    }
                    if (allNum.length != 0) {
                      list.insert(allNum, {}, function(e, d) {
                        if (e != null) {
                          console.log(e);
                          res.json({data: 'err'});
                        } else {
                          console.log(d);
                          res.redirect('back');
                        }
                      });
                    } else {
                      console.log('err: empty array');
                      res.redirect('back');
                    }
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        });
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
