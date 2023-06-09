import "./styles.css";
import {
    returnFormData,
    returnEmptyFormData
} from "./form.js";

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
    getDoc,
    setDoc
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
            createUsersCollection();
            console.log('After createUsersCollection');
        } else {
            console.log("Not signed in.");
            window.location.assign('login-redirect.html');
        }
    })
}


const createUsersCollection = async() => {
    console.log('createUsersCollection');
    try {
        const emptyFormData = returnEmptyFormData();
        const docRef = doc(firestore, 'userData', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Document exists!');
        } else {
            await setDoc(docRef, emptyFormData,
                {
                    merge: true
                });
                console.log('Users collection written with uid: ', currentUser.uid);
        }
    } catch(error) {
        console.log('Problem creating collection: ', error.message);
    }
}


export const submitPatientData = async() => {
    console.log('submitPatientData');
    const formData = returnFormData();
    const docRef = doc(firestore, 'userData', currentUser.uid);
    await setDoc(docRef, formData, {
        merge: true
    });
}


verifyStillLoggedIn();

btnSignup.addEventListener("click", submitPatientData);