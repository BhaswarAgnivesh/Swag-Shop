export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

let observers = {};  // Notification registry
let instance = null;

class NotificationService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    // Add an observer for a specific notification
    addObserver = (notifName, observer, callback) => {
        let obs = observers[notifName];
        if (!obs) {
            observers[notifName] = [];
        }
        observers[notifName].push({ observer, callback });
    }

    // Remove an observer for a specific notification
    removeObserver = (observer, notifName) => {
        let obs = observers[notifName];
        if (obs) {
            for (let i = 0; i < obs.length; i++) {
                if (observer === obs[i].observer) {
                    obs.splice(i, 1);
                    break;
                }
            }
        }
    }

    // Notify all observers of a specific notification
    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        if (obs) {
            obs.forEach(obj => {
                obj.callback(data); // ✅ Actually notify via callback
            });
        }
    }
}

export default NotificationService;
