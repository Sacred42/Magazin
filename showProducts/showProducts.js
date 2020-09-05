const product = require('../models/products');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false' , { useNewUrlParser : true, useFindAndModify : false , useUnifiedTopology: true});

var products = [
    new product ({
        name : 'Whey protein',
        image : 'https://dobrynya.su/image/cache/catalog/scr/9085_big-1200x800.jpg1',
        description : 'good protein',
        price : 26
    }),
    new product ({
        name : 'Synta-6',
        image : 'https://sportmax66.ru/images/catalog/b/916.jpg',
        description : 'Isolate protein',
        price : 32
    }),
    new product ({
        name : 'Maxler protein',
        image : 'https://cdn1.ozone.ru/multimedia/1037859384.jpg',
        description : 'small cost',
        price : 21
    }),
    new product ({
        name : 'Mutant Mass',
        image : 'https://nutritionstore.com.ua/wp-content/uploads/2020/04/mutant-mass-6800g.jpg',
        description : 'best ever gainer',
        price : 18
    }),
    new product ({
        name : 'BCAA',
        image : 'https://pbs.twimg.com/media/EOLazR4WAAMNTXL.jpg',
        description : 'BCAA',
        price : 14
    })
];

for(var i=0; products.length > i ; i++ ){
    products[i].save();
}



