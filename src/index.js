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
  updatePassword,
  sendEmailVerification

} from 'firebase/auth';



const firebaseApp = initializeApp({
  apiKey: "AIzaSyCu0pX5TlTf2fq2fQDizP5ybpvJ-iwDimw",
  authDomain: "se3316loginversion2.firebaseapp.com",
  projectId: "se3316loginversion2",
  storageBucket: "se3316loginversion2.appspot.com",
  messagingSenderId: "1068003737215",
  appId: "1:1068003737215:web:bc5b37be6531fde599494a",
  measurementId: "G-Z0YTYKMCXY"
  
})




const createAccount = async () => {
    const email = txtEmail.value;
    const password = txtPassword.value;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      // Send verification email
      sendEmailVerification(userCredential.user)
        .then(() => {
          alert("Signup successful. Verification email sent.");
        })
        .catch((error) => {
          console.error("Error sending verification email: ", error);
        });
    } catch (error) {
      console.log(`There was an error: ${error}`);
      showLoginError(error);
    } 
  };
  

const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      
      if (userCredential.user.emailVerified) {
        console.log("Email is verified");
        // User can log in
        showApp();
        showLoginState(userCredential.user);
      } else {
        // Email is not verified
        alert("Please verify your account before logging in.");
        await signOut(auth); // Optionally sign the user out
      }
    } catch (error) {
      console.error("Login error: ", error);
      showLoginError(error);
    }
  };
  
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
btnBeginSuperSite.addEventListener("click", () => {
    window.location.href = 'http://localhost:3000/'; // URL of the SuperSite
  });
  


const auth = getAuth(firebaseApp);
//connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();