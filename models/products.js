const mongoose = require('mongoose');
const schema = mongoose.Schema;

const product = new schema({
    name : {type : String},
    image : {type : String},
    description : {type : String},
    price : {type : Number}
});

module.exports = mongoose.model('productsX' , product);