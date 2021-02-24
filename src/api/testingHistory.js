import initFirebase from "../components/firebaseObj";
import { getUser } from "../utils/auth";

const firebase = initFirebase();
const testingHistoryCollection = firebase.firestore().collection("TestingHistory");

export function loadTestingData() {
    return testingHistoryCollection.where("userId", "==", getUser().uid)
        .get()
        .then((querySnapshot) => {
            const res = [];

            querySnapshot.forEach((doc) => {
                res.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            return res;
        })
}

export function addOrUpdateHistoryItem(item) {
    return item.id ? updateHistoryItem(item) : addHistoryItem(item);
}

function updateHistoryItem(item) {
    return testingHistoryCollection.doc(item.id).update(item);
}

function addHistoryItem(newItem) {
    newItem.userId = getUser().uid;

    return testingHistoryCollection.add(newItem);
}