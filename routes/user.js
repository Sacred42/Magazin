const express =  require('express');
const passport = require('passport');

const routes = express.Router();

routes.get('/profile', isLogin, (req, res , next)=>{
    const messages =  req.flash('success')[0];
    req.session.authEmail = messages;
    res.render('profile' , {messages } );
});

routes.get('/user-profile', isLogin, (req, res, next)=>{
    const email = req.session.authEmail;
    res.render('user-profile' , {email} )
})

// routes.use('/', notLogin, function(req, res, next){
//     next();
// });

routes.get('/signup', notLogin, (req, res, next)=>{
     var messages = req.flash('error') || [];
    res.render('signup',  {messages: messages, hasErrors: messages.length > 0});
});
routes.post('/signup' , passport.authenticate('local.signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}));

routes.get('/signin' ,notLogin, (req, res)=>{
    var messages = req.flash('error');
    res.render('signin' , {messages : messages , hasErrors : messages.length > 0 });
});

routes.post('/signin' , passport.authenticate('local.signin', {
    successRedirect : '/profile',
    failureRedirect : '/signin',
    failureFlash : true
}));

routes.get('/logout',  function(req, res, next){
    cookie = req.cookies;
    for (var prop in cookie) { // поиск свойства (куки)
        if(!prop) {
        return;   
    }   
        res.cookie(prop, '', {expires: new Date(0)}); // установление найденого куки на 0 - удаление
    }
    res.redirect('/');
})

function isLogin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLogin(req, res, next){
    if(!req.isAuthenticated()){
       return next();
    }
    res.redirect('/');
}



module.exports = routes;