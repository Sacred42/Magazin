const express = require('express');
const Ehbs = require('express-handlebars');
const rout = require('./routes/routes');
const routUser = require('./routes/user');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const Mongostore = require('connect-mongo')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();
const valid = require('express-validator');

app.listen(3000 , ()=>{ console.log('Сервер запущен!')});
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false' , { useNewUrlParser : true, useFindAndModify : false , useUnifiedTopology: true});
require('./config/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(valid()); // ставить сразу после body-parser!!
app.use(cookieParser());
// app.use(express.json()); 
// app.use(express.urlencoded({extended : false})); 
app.use(session({
    secret: 'random',
    store : new Mongostore({ mongooseConnection: mongoose.connection }),
    resave: false, 
    saveUninitialized: false,
    cookie : {
        maxAge : 30 * 1000 * 60
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.engine('hbs', Ehbs({defaultLayout : 'main', extname : '.hbs'}));
app.set('view engine' ,'.hbs');
app.use(function(req, res , next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})
app.use(routUser);
app.use('/' , rout);
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    var err = new Error('error');
    err.status = 404;
    next(err);
  });