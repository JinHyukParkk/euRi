
const
    request = require('request')

const
    PUSH_SERVER = 'https://fcm.googleapis.com/fcm/send'

class FCMWP {
    constructor() {
        this.AUTH_KEY = ''
    }

    setAuthKey(AUTH_KEY) {
        this.AUTH_KEY = 'key=' + AUTH_KEY
    }

    /**
     * Verify token
     * @param {String} token
     * @returns {Promise}
     */
    verifyToken(token) {
        return new Promise((res, rej) => {
            let options = {
                method: 'POST',
                url: PUSH_SERVER,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.AUTH_KEY
                },
                body: JSON.stringify({
                    'dry_run': true,
                    'to': token
                })
            }
            request(options, (error, response, body) => {
                if (error || response.statusCode != 200) return rej(error)
                body = JSON.parse(body)
                res(body)
            })
        })
    }

    /**
     * Send Notifications
     * @param {Array} tokens
     * @param {JSON} notification
     * @returns {Promise}
     */
    sendNotification(tokens, notification) {
        return new Promise((res, rej) => {
            let options = {
                method: 'POST',
                url: PUSH_SERVER,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.AUTH_KEY
                },
                body: JSON.stringify({
                    notification,
                    'registration_ids': tokens
                })
            }
            request(options, (error, response, body) => {
                if (error || response.statusCode != 200) return rej(error)
                body = JSON.parse(body)
                res(body)
            })
        })
    }
}
module.exports = FCMWP
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

// Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken()
  .then(function(currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })
  .catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
}

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    // ...
  })
  .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});
