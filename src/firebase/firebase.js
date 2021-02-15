import firebaseInstance from "firebase"
import { firebaseConfig } from "../config/firebase.config"

export default function getFirebase() {
    if (typeof window !== 'undefined') {
        firebaseInstance.initializeApp(firebaseConfig);

        return firebaseInstance;
    }

    return null;
}