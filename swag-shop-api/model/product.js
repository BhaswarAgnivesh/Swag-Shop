// Import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the product schema
var product = new Schema({
    title: String,                  // Title of the product
    price: Number,                 // Price of the product
    likes: { type: Number, default: 0 } // Number of likes with default value 0
});

// Export the model
module.exports = mongoose.model('Product', product);
