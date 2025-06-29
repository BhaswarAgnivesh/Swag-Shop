import React, { Component } from 'react';
import './product-condensed.css';
import DataService from '../services/data-service';

let ds = new DataService();

class ProductCondensed extends Component {
  removeProduct = () => {
    ds.removeWishListItem(this.props.product);
  };

  render() {
    const { product } = this.props;

    return (
      <li className="product-condensed">
        <span className="product-info">
          {product.title} | <strong>${product.price}</strong>
        </span>
        <button className="remove-btn" onClick={this.removeProduct}>
          ×
        </button>
      </li>
    );
  }
}

export default ProductCondensed;
