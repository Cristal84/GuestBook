var http = require('http');
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var index = require('./routes/index');
//var users = require('./routes/users');

mongoose.connect('mongodb://localhost/test',{userMongoClient:true});
mongoose.Promise = global.Promise;

var app = express();

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var entries = [];
app.locals.entries = entries;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);


app.get("/", function (req, res) {
    res.render("index");
});

app.get("/new-entry", function (req, res) {
    res.render("new-entry");
});


app.post("/new-entry", function (req, res) {
    if (!req.body.title || !req.body.body) {
    res.status(400).send("Entries must have a title and a body.");
    return;
}
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    res.redirect("/");
    //console.log(entries);
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).render("404");
});

http.createServer(app).listen(3000, function () {
    console.log("Guestbook app started on port 3000.");
});

module.exports = app;
