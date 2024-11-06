
//<!-- Firebase and Custom JavaScript -->

import { getAuth,sendPasswordResetEmail} from "./firebase.js";

const auth = getAuth();

let email = document.getElementById('email');
let btn =  document.getElementById('restBtn')

if(btn){
btn.addEventListener('click',  function() {

   


sendPasswordResetEmail(auth, email.value)
  .then(() => {
    alert('send Password Reset Email sent successfully');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

});
}