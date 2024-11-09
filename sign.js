
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup,
collection ,addDoc ,db,provider
 } from './firebase.js';
 const auth = getAuth()
 

//const provider = new GoogleAuthProvider();


let nameF = document.getElementById('Name')
let dOB = document.getElementById('DOB')
let PhoneNumber = document.getElementById('PhoneNumber')
let rollNo = document.getElementById('RollNo')



  let users = {
    firstN: nameF.value,
    date: dOB.value,
    phone: PhoneNumber.value,
    roll: rollNo.value
  }


const signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {

  signUpBtn.addEventListener("click", async () => {

    try {
      const docRef = await addDoc(collection(db, "users"), {
        ...users
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log(e);
    }
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    if (!emailField || !passwordField) 
      
return
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
        //location.href = './login.html'; // Redirect after successful signup
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