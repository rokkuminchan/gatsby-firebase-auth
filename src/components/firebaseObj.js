import firebase from "gatsby-plugin-firebase";

export default function initFirebase() {

    if (window && window.location.hostname === 'localhost') {
        firebase.firestore().settings({
            host: "localhost:8080",
            ssl: false
        });
    }

    return firebase;
}