import React, { Component } from 'react';
import './product.css';

import DataService from '../services/data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onWishList: ds.itemOnWishList(this.props.product)
    };

    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.onWishListChanged = this.onWishListChanged.bind(this);
  }

  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
  }

  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
  }

  onWishListChanged(newWishList) {
    const isOnList = ds.itemOnWishList(this.props.product);
    this.setState({ onWishList: isOnList });
  }

  onButtonClicked() {
    const { product } = this.props;
    if (this.state.onWishList) {
      ds.removeWishListItem(product);
    } else {
      ds.addWishListItem(product);
    }
  }

  render() {
    const { title, price, imgUrl } = this.props.product;
    const { onWishList } = this.state;

    const btnClass = onWishList ? "btn btn-danger" : "btn btn-primary";
    const btnText = onWishList ? "Remove from Wishlist" : "Add to Wishlist";

    return (
      <div className="card product-card">
        <img className="card-img-top product-img" src={imgUrl} alt={title} />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text price">Price: ${price}</p>
          <button onClick={this.onButtonClicked} className={btnClass}>
            {btnText}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
