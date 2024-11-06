  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

  import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword,
    onAuthStateChanged, sendEmailVerification,
    updateProfile,updateEmail,signOut ,
    sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,
    getRedirectResult} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

 
  const firebaseConfig = {
    apiKey: "AIzaSyDG-n3P2PSFuSK9xAhMM-JUtNjlj1WYmFs",
    authDomain: "fir-auth-ebf5e.firebaseapp.com",
    projectId: "fir-auth-ebf5e",
    storageBucket: "fir-auth-ebf5e.firebasestorage.app",
    messagingSenderId: "740120765731",
    appId: "1:740120765731:web:ae2074bdc1b8d5c9989896"
  };


  const app = initializeApp(firebaseConfig); 

  
const provider = new GoogleAuthProvider();
 const auth = getAuth()
  console.log(app,auth,provider);


  export {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,
    sendEmailVerification, updateProfile,updateEmail ,sendPasswordResetEmail,signOut ,GoogleAuthProvider,
    signInWithPopup,getRedirectResult}