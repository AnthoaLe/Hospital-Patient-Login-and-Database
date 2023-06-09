import "./styles.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth,
    connectAuthEmulator,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    connectFirestoreEmulator,
    doc,
    getDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2JXgMMFpBuM6KG0yrxCofjpy76ZEPDIc",
    authDomain: "anhoale-hospital-website.firebaseapp.com",
    databaseURL: "https://anhoale-hospital-website-default-rtdb.firebaseio.com",
    projectId: "anhoale-hospital-website",
    storageBucket: "anhoale-hospital-website.appspot.com",
    messagingSenderId: "245114467057",
    appId: "1:245114467057:web:9e2b3186bb350ef22b2f50",
    measurementId: "G-NZYZFPCY41"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");
const firestore = getFirestore(firebaseApp);
// I don't know why this randomly has a different formatting from the connectAuthEmulator
// Reference: https://firebase.google.com/docs/reference/js/firestore_.md#connectfirestoreemulator
// connectFirestoreEmulator(firestore, "localhost", 8080);

let currentUser;


const verifyStillLoggedIn = async() => {
    console.log('verifyStillLoggedIn');
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user);
            currentUser = user;
            getUserData();
        } else {
            console.log("Not signed in.");
            window.location.assign('login-redirect.html');
        }
    })
}


export const firstName = document.querySelector('#firstName');
export const lastName = document.querySelector('#lastName');
export const email = document.querySelector('#email');
export const address = document.querySelector('#address');
export const sex = document.querySelector('#sex');
export const history = document.querySelector('#history');
export const medication = document.querySelector('#medication');
export const mental = document.querySelector('#mental');


const getUserData = async() => {
    console.log('getUserData');
    try {
        const docRef = doc(firestore, 'userData', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('User data exists!');
            console.log(docSnap.data());
            firstName.innerHTML = docSnap.get('firstName');
            lastName.innerHTML = docSnap.get('lastName');
            email.innerHTML = docSnap.get('email');
            address.innerHTML = docSnap.get('address');
            sex.innerHTML = docSnap.get('sex');
            history.innerHTML = docSnap.get('history');
            medication.innerHTML = docSnap.get('medication');
            mental.innerHTML = docSnap.get('mental');
        } else {
            window.location.assign('patient.html');
        }
    } catch(error) {
        console.log('Problem getting user data: ', error.message);
    }
}


verifyStillLoggedIn();