import { AuthErrorCodes } from 'firebase/auth';

export const txtEmail = document.querySelector('#txtEmail')
export const txtPassword = document.querySelector('#txtPassword')

export const btnLogin = document.querySelector('#btnLogin')
export const btnSignup = document.querySelector('#btnSignup')

export const btnLogout = document.querySelector('#btnLogout')

export const divAuthState = document.querySelector('#divAuthState')
export const lblAuthState = document.querySelector('#lblAuthState')

export const divLoginError = document.querySelector('#divLoginError')
export const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage')

export const txtNewPassword = document.querySelector('#txtNewPassword');
export const btnChangePassword = document.querySelector('#btnChangePassword');
export const divPasswordChangeError = document.querySelector('#divPasswordChangeError');
export const lblPasswordChangeErrorMessage = document.querySelector('#lblPasswordChangeErrorMessage');
export const welcomeMessage = document.querySelector('#welcomeMessage');
export const btnBeginSuperSite = document.querySelector('#btnBeginSuperSite');











export const showPasswordChangeError = (error) => {
  divPasswordChangeError.style.display = 'block';
  lblPasswordChangeErrorMessage.innerHTML = error.message;
}

export const hidePasswordChangeError = () => {
  divPasswordChangeError.style.display = 'none';
  lblPasswordChangeErrorMessage.innerHTML = '';
}




export const showLoginForm = () => {
  login.style.display = 'block'
  app.style.display = 'none'  
  welcomeMessage.style.display = 'block'; 
}

export const showApp = () => {
  login.style.display = 'none'
  app.style.display = 'block'
  welcomeMessage.style.display = 'none';
  btnBeginSuperSite.style.display = 'block';
}

export const hideLoginError = () => {
  divLoginError.style.display = 'none'
  lblLoginErrorMessage.innerHTML = ''
}

export const showLoginError = (error) => {
    divLoginError.style.display = 'block'
  
    // Handle invalid email error
    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
      lblLoginErrorMessage.innerHTML = 'Please enter a valid email address.';
    }
    // Handle email already in use error (relevant during signup)
    else if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
      lblLoginErrorMessage.innerHTML = 'This email address is already in use.';
    }
    // Handle incorrect password or invalid login credentials error (relevant during login)
    else if (error.code === 'auth/wrong-password' || error.code === AuthErrorCodes.INVALID_PASSWORD) {
      lblLoginErrorMessage.innerHTML = 'Incorrect password or invalid login credentials. Try again.';
    }
    // Handle other errors
    else {
      lblLoginErrorMessage.innerHTML = `Error: ${error.message}`;
    }
  }
  
  
export const showLoginState = (user) => {
  lblAuthState.innerHTML = `You're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email}) `
}

hideLoginError()