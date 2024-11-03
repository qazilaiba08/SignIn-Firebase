
//<!-- Firebase and Custom JavaScript -->

import { getAuth, updatePassword ,sendPasswordResetEmail} from "firebase.js";

const auth = getAuth();



document.getElementById('restBtn').addEventListener('submit', (e) => {
    e.preventDefault();
   

    const user = auth.currentUser;
    let email = document.getElementById('email');
    // let password = document.getElementById('password')

    const newPassword = getASecureRandomPassword();
    
updatePassword(user, newPassword).then(() => {

    // password.value = newPassword; 
    console.log(newPassword);
    
}).catch((error) => {
  alert(error)
});

sendPasswordResetEmail(auth, email.value)
  .then(() => {
    alert('Password Reset Email sent successfully');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error:${error.message}`)
  });

});