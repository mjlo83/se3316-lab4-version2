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

export const showLoginForm = () => {
  login.style.display = 'block'
  app.style.display = 'none'  
}

export const showApp = () => {
  login.style.display = 'none'
  app.style.display = 'block'
}

export const hideLoginError = () => {
  divLoginError.style.display = 'none'
  lblLoginErrorMessage.innerHTML = ''
}

export const showLoginError = (error) => {
    
    divLoginError.style.display = 'block';    
  
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