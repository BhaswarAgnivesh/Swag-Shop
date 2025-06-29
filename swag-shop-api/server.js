// Import required modules
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to MongoDB
var db = mongoose.connect('mongodb://localhost/swag-shop');

// Initialize express app
var app = express();
app.use(cors()); // ✅ Allow cross-origin requests

// Import models
var Product = require('./model/product');
var WishList = require('./model/wishlist');

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// POST endpoint to create a new product
// await pauses the function and works with async function so
app.post('/product', async function(request, response) {
    // Create a new product instance
    var product = new Product();

    // Assign each field from the request body
    product.title = request.body.title;
    product.price = request.body.price;
    product.likes = 0; // Default likes

    try {
        // Save the product to the database
        const savedProduct = await product.save();
        // Send the saved product as the response
        response.send(savedProduct);
    } catch (err) {
        // Handle any errors that occur during save
        response.status(500).send({ error: "Could not save product" });
    }
});

// GET endpoint to fetch all products
app.get('/product', function(request, response) {
    Product.find({})
        .then(function(products) {
            response.send(products);
        })
        .catch(function(err) {
            response.status(500).send({ error: "Could not fetch products" });
        });
});

// POST endpoint to create a new wishlist
app.post('/wishlist', async function(request, response) {
    // Create a new wishlist instance
    var wishList = new WishList();

    // Assign each field from the request body
    wishList.title = request.body.title;

    try {
        // Save the product to the database
        const newWishList = await wishList.save();
        // Send the saved product as the response
        response.send(newWishList);
    } catch (err) {
        // Handle any errors that occur during save
        response.status(500).send({ error: "Could not create new wishlist." });
    }
});


// GET endpoint to fetch all wishlist
//old boring way. we need to populate the data
//app.get('/wishlist', function(request, response) {
//    // Find all wishlist documents from the database
//    WishList.find({})
//        .then(function(wishLists) {
//            // Send the list of wishlists as the response
//            response.send(wishLists);
//        })
//        .catch(function(err) {
//            // Handle any errors that occur while fetching
//            response.status(500).send({ error: "Could not fetch wishlist" });
//        });
//});



// GET endpoint to fetch all wishlists with populated product details
app.get('/wishlist', function(request, response) {
    // Find all wishlist documents and populate the 'products' array with actual Product data
    WishList.find({})
        .populate({ path: 'products', model: 'Product' }) // Replaces product IDs with full product docs
        .then(function(wishLists) {
            // Send the populated wishlists as the response
            response.send(wishLists);
        })
        .catch(function(err) {
            // Handle any errors that occur during fetching or populating
            response.status(500).send({ error: "Could not fetch wishlist" });
        });
});




// PUT endpoint to add a product to a wishlist
app.put('/wishlist/product/add', function(request, response) {
    // Find the product by ID
    Product.findOne({ _id: request.body.productID })
        .then(function(product) {
            if (!product) {
                return response.status(404).send({ error: "Product not found." });
            }

            // Add product ID to wishlist using $addToSet (prevents duplicates)
            return WishList.updateOne(
                { _id: request.body.wishListId },
                { $addToSet: { products: product._id } }
            );
        })
        .then(function(result) {
            // Send success response after update
            response.send({ message: "Product added to wishlist successfully.", result: result });
        })
        .catch(function(err) {
            // Handle any errors in the process
            response.status(500).send({ error: "Could not add item to wishlist." });
        });
});


// Start the server
app.listen(3004, function() {
    console.log("Swag Shop API running on port 3004...");
});