// Import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Define the wishlist schema
var wishList = new Schema({
    title: { type: String, default: "Cool Wish List" }, // Default title
    products: [{ type: ObjectId, ref: 'Product' }]       // Reference to Product documents
});

// Export the model
module.exports = mongoose.model('WishList', wishList);
