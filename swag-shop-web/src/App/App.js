import React, { useEffect, useState } from 'react';
import './App.css';

// Components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';

// Services
import HttpService from '../services/http-service';

const http = new HttpService();

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    http.getProducts().then(data => {
      if (data) setProducts(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>The Swag Shop</h2>
      </header>

      <main className="App-main container">
        <div className="row">
          {/* Product list section */}
          <div className="col-lg-8">
            <div className="row">
              {products.map(product => (
                <div className="col-md-6 col-lg-4 mb-4" key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist sidebar */}
          <div className="col-lg-4">
            <WishList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
