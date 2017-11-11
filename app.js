var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var router = require('./router/main')(app, fs);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(80, function() {
    console.log("Express server has started on port 80");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: '@@@@SUNWOOSIGN@@@@',
    resave: false,
    saveUninitialized: true
}));
