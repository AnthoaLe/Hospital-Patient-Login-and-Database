import { AuthErrorCodes } from 'firebase/auth';


export const tabLogin = document.querySelector('#tabLogin');
export const tabRegister = document.querySelector('#tabRegister');


export const loginEmail = document.querySelector('#loginEmail');
export const loginPassword = document.querySelector('#loginPassword');
export const btnLogin = document.querySelector('#btnLogin');
export const labelLoginErrorMessage = document.querySelector('#labelLoginErrorMessage');


export const registerEmail = document.querySelector('#registerEmail');
export const registerPassword = document.querySelector('#registerPassword');
export const confirmPassword = document.querySelector('#confirmPassword');
export const btnRegister = document.querySelector('#btnRegister');
export const labelRegisterErrorMessage = document.querySelector('#labelRegisterErrorMessage');


export const app = document.querySelector('#app');
export const labelAuthState = document.querySelector('#labelAuthState');
export const btnLogout = document.querySelector('#btnLogout');


export const hideLoginError = () => {
    console.log('hideLoginError');
    labelLoginErrorMessage.classList.add('visually-hidden');
    labelLoginErrorMessage.innerHTML = '';
}


export const showLoginError = (error) => {
    console.log('showLoginError');
    labelLoginErrorMessage.classList.remove('visually-hidden');
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
        labelLoginErrorMessage.innerHTML = 'Wrong password. Try again.';
    }
    else {
        labelLoginErrorMessage.innerHTML = `Error: ${error.message}`;
    }
}


export const tabLoginClick = () => {
    console.log('loginTab');
    hideLoginError();
}


export const hideRegisterError = () => {
    console.log('hideRegisterError');
    labelRegisterErrorMessage.classList.add('visually-hidden');
    labelRegisterErrorMessage.innerHTML = '';
}


export const showRegisterError = () => {
    console.log('showRegisterError');
    labelRegisterErrorMessage.classList.remove('visually-hidden');
    labelRegisterErrorMessage.innerHTML = 'Error';
}


export const tabRegisterClick = () => {
    console.log('registerTab');
    hideRegisterError();
}


export const showLoginState = (user) => {
    console.log('showLoginState');
    labelAuthState.innerHTML = `You're logged in as (uid ${user.uid}, email: ${user.email})`;
}


export const showApp = (user) => {
    console.log('showApp');
    app.classList.remove('visually-hidden');
    showLoginState(user);
}


hideLoginError();
hideRegisterError();
console.log('ui loaded');