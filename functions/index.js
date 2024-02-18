/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
var admin = require('firebase-admin');

async function onLocationChanged(_notifId, _location) {
    // Get the owners details
    const owner = admin.firestore().collection('users').doc(ownerId).get();
  
    // Get the users details
    const user = admin.firestore().collection('users').doc(userId).get();
  
    await admin.messaging().sendEachForMulticast({
        tokens: owner.tokens, // ['token_1', 'token_2', ...]
        data: {
            owner: JSON.stringify(owner),
            user: JSON.stringify(user),
            
        },
        apns: {
            payload: {
                aps: {
            // Required for background/quit data-only messages on iOS
            // Note: iOS frequently will receive the message but decline to deliver it to your app.
            //           This is an Apple design choice to favor user battery life over data-only delivery
            //           reliability. It is not under app control, though you may see the behavior in device logs.
                    'content-available': true,
            // Required for background/quit data-only messages on Android
                    priority: 'high',
                },
            },
        },
    });
}

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
