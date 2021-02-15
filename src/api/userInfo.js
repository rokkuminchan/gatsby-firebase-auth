import firebase from "gatsby-plugin-firebase"

import { getUser } from "../utils/auth"

export async function getUserInfo() {
    const { uid } = getUser();
    const storageRef = firebase.storage().ref();
    const cachedData = localStorage.getItem(uid);
    const url = "";

    // if (cachedData) {
    //     return new Promise(function (resolve, reject) {
    //         resolve(JSON.parse(cachedData));
    //     });
    // }

    try {
        url = await storageRef.child(`/${uid}/data.json`).getDownloadURL();
    } catch (error) {
        return null;
    }

    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.responseType = 'application/json';
        xhr.onload = function () {
            const status = xhr.status;

            if (status == 200) {
                localStorage.setItem(uid, JSON.stringify(xhr.response))
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
}

export function saveUserInfo(dataObj) {
    const { uid } = getUser();
    var storageRef = firebase.storage().ref();

    // convert your object into a JSON-string
    var jsonString = JSON.stringify(dataObj);
    // create a Blob from the JSON-string
    var blob = new Blob([jsonString], { type: "application/json" });
    var fileRef = storageRef.child(`/${uid}/data.json`);

    // upload you blob into the storage fileRef.put(blob).then(function(snapshot) {
    fileRef.put(blob).then(function (snapshot) {
        console.log('Uploaded a blob!');
    });
}