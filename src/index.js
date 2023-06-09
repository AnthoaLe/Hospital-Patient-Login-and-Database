import "./styles.css";
import {
  loginEmail,
  loginPassword,
  registerEmail,
  registerPassword,
  confirmPassword,
  btnLogin,
  btnRegister,
  btnLogout,
  labelLoginErrorMessage,
  labelRegisterErrorMessage,
  labelAuthState,
  hideLoginError,
  showLoginState,
  showLoginError,
  showRegisterError,
  hideRegisterError,
  showApp,
  tabLogin,
  tabRegister,
  tabLoginClick,
  tabRegisterClick
} from "./ui.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Configuration object is safe to include on the client side
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");


const loginEmailPassword = async() => {
  console.log('loginEmailPassword');
  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    console.log("Logged in");
    hideLoginError();
    showApp(userCredential.user);
    window.location.assign('patient.html');
  } catch(error) {
    console.log(error);
    showLoginError(error);
  }
}


const createAccount = async() => {
  console.log('createAccount');
  const email = registerEmail.value;
  const password = registerPassword.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    console.log("Account created");
    hideRegisterError();
  } catch(error) {
    console.log(error);
    showRegisterError(error);
  }
}


const monitorAuthState = async() => {
  console.log('monitorAuthState');
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      console.log("Signed in.");
      window.location.assign('patient.html');
    } else {
      labelAuthState.innerHTML = "You're not logged in.";
    }
    console.log('monitor');
  });
}


const logout = async() => {
  console.log('logout');
  await signOut(auth);
}


const main = () => {
  console.log('main');
}


btnLogin.addEventListener("click", loginEmailPassword);
btnRegister.addEventListener("click", createAccount);
btnLogout.addEventListener("click", logout);
tabLogin.addEventListener("click", tabLoginClick);
tabRegister.addEventListener("click", tabRegisterClick);


monitorAuthState();
main();