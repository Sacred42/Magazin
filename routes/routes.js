const express =  require('express');
const product = require('../models/products');
const Cart = require('../models/cart');
const { Router } = require('express');
const cart = require('../models/cart');
const products = require('../models/products');

const routes = express.Router();

routes.get('/' , async (req , res)=>{
const productsi = await product.find({}).lean();
res.render('shop', { productsi : productsi} );
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
   console.log(cart.arrGenerate());
})


module.exports = routes;