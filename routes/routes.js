const express =  require('express');
const product = require('../models/products');
const Cart = require('../models/cart');
const { Router } = require('express');
const cart = require('../models/cart');
const products = require('../models/products');

const routes = express.Router();

routes.get('/' , async (req , res)=>{
var successMsg = req.flash('success')[0];
const productsi = await product.find({}).lean();
res.render('shop', { productsi : productsi, successMsg : successMsg , noMsg : !successMsg});
});

routes.get('/add-to-cart/:id' , (req, res, next)=>{
 var productId = req.params.id;
 var cart = new Cart(req.session.cart ? req.session.cart : {});

 product.findById(productId , function(err , item){
    if (err){
        return res.redirect('/');
      }
     cart.add(item , item.id);
     req.session.cart = cart;
     console.log(req.session.cart);
     res.redirect('/');
 })

} );

routes.get('/shopping-cart', (req ,res , next)=>{
  if(!req.session.cart){
   return res.render('shopping-cart', {products : null});
  }
  var cart = new Cart(req.session.cart);
   res.render('shopping-cart', {products : cart.arrGenerate(), totalPrice : cart.totalPrice});
  
});

routes.get('/checkouts' , function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var errorMsg = req.flash('error')[0];
  var cart = new Cart(req.session.cart);
  res.render('checkouts' , {TotalPrice : cart.totalPrice, errorMsg : errorMsg , noErrormsg : !errorMsg});
});

routes.post('/checkouts' ,(req, res, next)=>{
   if(!req.session.cart){
     return res.render('shopping-cart');
   }
 var cart = new Cart(req.session.cart);
 const stripe = require('stripe')('sk_test_51HP3AGKIW5JeEp10AhIYB8X3YPTK2w30n1buZhQj3RWbLc4iXVfI4xqlkIG3sdx6kq1CVnfAEC3mluFUcuhF8H6N00CrUcaSXX');

 stripe.charges.create({
   amount : Math.round(cart.totalPrice * 100),
   currency: 'usd',
   source: req.body.stripeToken,
   description: 'My First Test Charge ',

 }, function(err, charge){
   if(err){
     req.flash('error' , err,message);
     return res.redirect('/checkouts');
   }
   req.flash('success', 'Succes bought!');
   req.session.cart = null;
   res.redirect('/');
 })
});


module.exports = routes;