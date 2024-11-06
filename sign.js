
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, getRedirectResult, GoogleAuthProvider } from './firebase.js';

// Firebase Auth Initialization
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
auth.languageCode = 'en';
provider.setCustomParameters({ prompt: 'select_account' });

// Handle Google Sign-In with Popup
const googleButton = document.getElementById("Google");
if (googleButton) {
  googleButton.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        document.getElementById("message").textContent = `Welcome, ${user.displayName}`;
        console.log('Google Sign-In successful:', user);
      })
      .catch((error) => {
        console.log("Error during Google sign-in:", error.message);
       console.log(`Error: ${error.message}`);
       
      });
  });
}

// Handle Google Sign-In with Redirect
const redirectButton = document.getElementById('google');
if (redirectButton) {
  redirectButton.addEventListener('click', () => {
    signInWithRedirect(auth, provider);
  });
}

getRedirectResult(auth)
  .then((result) => {
    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      document.getElementById("message").textContent = `Welcome back, ${user.displayName}`;
      console.log('Google Redirect Sign-In successful:', user);
    }
  })
  .catch((error) => {
    console.error("Error during redirect sign-in:", error.message);
    console.log(`Error: ${error.message}`);
  });

// Handle Email and Password Sign-Up
const signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {
  signUpBtn.addEventListener("click", () => {
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    if (!emailField || !passwordField) return;

    const email = emailField.value;
    const password = passwordField.value;

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!email || !password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are mandatory to fill.",
      });
    }
    if (!emailPattern.test(email)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }
    if (!passwordPattern.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long.",
      });
    }

    // Firebase Sign-Up
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up successfully:', user);
        Swal.fire({
          title: "Success!",
          text: "You have signed up successfully!",
          icon: "success",
        });
        location.href = './login.html'; // Redirect after successful signup
      })
      .catch((error) => {
        console.error("Error during sign-up:", error.message);
        Swal.fire({
          icon: "error",
          title: "Sign-Up Error",
          text: "An error occurred during sign-up. Please try a different email.",
        });
      });
  });
}
