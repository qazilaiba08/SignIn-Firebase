
//<!-- Firebase and Custom JavaScript -->

import { getAuth,sendPasswordResetEmail } from "./firebase.js";

const auth = getAuth();



let btn =  document.getElementById('restBtn')

if(btn){
btn.addEventListener('click', (e) => {
  e.preventDefault();

  let email = document.getElementById('email');
 
  updatePassword(user, newPassword).then(() => {
    // Update successful.
  }).catch((error) => {
    // An error ocurred
    // ...
  });


});
}