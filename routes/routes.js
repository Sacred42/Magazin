const express =  require('express');
const product = require('../models/products');
const passport = require('passport');

const routes = express.Router();

routes.get('/' , async (req , res)=>{
const productsi = await product.find({}).lean();
res.render('shop', { productsi : productsi} );
});

routes.get('/signup', (req, res, next)=>{
    // var messages = req.flash('error');
    res.render('signup');
});

routes.post('/signup' , passport.authenticate('local.signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}))

routes.get('/profile', (req, res , next)=>{
    res.render('profile');
})


module.exports = routes;