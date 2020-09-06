const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//регистрация
passport.use('local.signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
} , function(req, email, password, done){
    req.checkBody('email' , 'Invaild email!').notEmpty().isEmail();
    req.checkBody('password' , 'Invaild passsword').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach((errors)=>{
            messages.push(errors.msg);
        })
        return done(null , false , req.flash('error' , messages));
    }
    User.findOne({'email' : email} , function(err , user) {
        if(err){
            return done(err);
        }
        if(user){
           return done(null , false, req.flash('error' , 'Email is already!'));
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err , result){
            if (err){
                return done (err);
            }
            return done(null , newUser)
        })
    })
}));


passport.use('local.signin' , new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, email, password, done){
    req.checkBody('email' , 'Invaild email').isEmail();
    req.checkBody('password' , 'Invaild password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach((error)=>{
            messages.push(eror.msg)
        })
        return done(null, false, req.flash('error' , messages));
    }
    User.findOne({'email' : email}, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, req.flash('error' , 'User not found'));
        }
        if(!user.validPassword(password)){
            return done(null, false, req.flash('error', 'Password is wrong'));
        }
        return done(null, user);
    })
}));