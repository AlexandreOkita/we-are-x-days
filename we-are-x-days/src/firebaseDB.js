import firebase from "firebase";
const firebaseConfig = require('./secrets/secrets')
// Required for side-effects
require("firebase/firestore");

const config = {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: "we-are-x-days"
}
const firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.firestore();

console.log("db created")

export default db