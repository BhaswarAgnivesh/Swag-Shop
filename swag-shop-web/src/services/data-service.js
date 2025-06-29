// data-service.js

import NotificationService, { NOTIF_WISHLIST_CHANGED } from './notification-service';

let ns = new NotificationService();  // Singleton NotificationService

let instance = null;        // Singleton instance for DataService
let wishList = [];          // Internal wishlist array

class DataService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    // Check if an item is already on the wishlist
    itemOnWishList = (item) => {
        for (let i = 0; i < wishList.length; i++) {
            if (wishList[i]._id === item._id) {
                return true;
            }
        }
        return false;
    }

    // Add an item to the wishlist and notify observers
    addWishListItem = (item) => {
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, this.getWishList());
    }

    // Remove an item from the wishlist and notify observers
    removeWishListItem = (item) => {
        for (let i = 0; i < wishList.length; i++) {
            if (wishList[i]._id === item._id) {
                wishList.splice(i, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, this.getWishList());
                break;
            }
        }
    }

    // Get a shallow copy of the current wishlist
    getWishList = () => {
        return [...wishList];
    }
}

export default DataService;
