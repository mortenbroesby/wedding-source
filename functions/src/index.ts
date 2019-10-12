/*

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request: any, response: any) => {
  response.send("Hello from Firebase!");
});

exports.subscribeUser = functions.firestore
  .document("subscriptions/{subscriptionId}")
  .onWrite((change: any, context: any) => {
    console.log(">>>>>> context: ", context);
    console.log(">>>>>> change: ", change);
  });

exports.onRSVP = functions.firestore
  .document("rsvp/{rsvpID}")
  .onWrite((change: any, context: any) => {
    console.log(">>>>>> context: ", context);
    console.log(">>>>>> change: ", change);
  });

exports.onTest = functions.firestore
  .document("test/{testID}")
  .onWrite((change: any, context: any) => {
    console.log(">>>>>> context: ", context);
    console.log(">>>>>> change: ", change);
  });

*/