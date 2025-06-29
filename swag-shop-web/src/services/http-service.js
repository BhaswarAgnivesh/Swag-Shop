//This is in ES 6. You can see it's equivalent Javascript

import 'whatwg-fetch'; // Polyfill for fetch (mainly for older browsers)

// Service class to handle HTTP requests
class HttpService {
    // Method to get products from the backend API
    getProducts = () => {
        return fetch('http://localhost:3004/product')
            .then(response => response.json())           // Parse response as JSON
            .catch(error => {
                console.error("Error fetching products:", error); // Handle any fetch errors
            });
    };
}

export default HttpService;
