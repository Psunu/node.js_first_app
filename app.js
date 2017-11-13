var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: '@@@@SUNWOOSIGN@@@@',
    resave: false,
    saveUninitialized: true
}));

app.listen(80, function() {
    console.log("Express server has started on port 80");
});

var main_router = require('./router/main')(app, fs);
var users_router = require('./router/users')(app, fs);
var login_router = require('./router/login')(app, fs);
