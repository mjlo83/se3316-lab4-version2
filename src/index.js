import './styles.css';
import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout,
  txtNewPassword,
  btnChangePassword,
  showPasswordChangeError,
  hidePasswordChangeError

  
} from './ui'

import { initializeApp } from 'firebase/app';

import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword

} from 'firebase/auth';



const firebaseApp = initializeApp({
  apiKey: "AIzaSyCu0pX5TlTf2fq2fQDizP5ybpvJ-iwDimw",
  authDomain: "se3316loginversion2.firebaseapp.com",
  projectId: "se3316loginversion2",
  storageBucket: "se3316loginversion2.appspot.com",
  messagingSenderId: "1068003737215",
  appId: "1:1068003737215:web:bc5b37be6531fde599494a",
  measurementId: "G-Z0YTYKMCXY"
  
});

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value
  console.log("yes we caught it in index1")
  
  

  // step 1: try doing this w/o error handling, and then add try/catch
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

  // step 2: add error handling
    try {
        
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      
      console.log("yes we caught it in index2")
    }
    catch(error) {
      showLoginError(error)
    }
}

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential.user);
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  } 
}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

// Log out
const logout = async () => {
  await signOut(auth);
}
// Change password function
const changePassword = async () => {
    const newPassword = txtNewPassword.value;
    const user = auth.currentUser;
  
    if (!newPassword) {
      showPasswordChangeError({ message: "Please enter a new password." });
      return;
    }
  
    try {
      await updatePassword(user, newPassword);
      alert("Password changed successfully.");
      txtNewPassword.value = ''; // Clear the input field
      hidePasswordChangeError();
    } catch (error) {
      console.error("Error changing password: ", error);
      showPasswordChangeError(error);
    }
  };
  
  // Attach event listener to change password button
  btnChangePassword.addEventListener("click", changePassword);
  
  // Event listener for change password button


btnLogin.addEventListener("click", loginEmailPassword) 
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)


const auth = getAuth(firebaseApp);
//connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();