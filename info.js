

import { getAuth, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification,signOut  } from "./firebase.js";

const auth = getAuth();
let btn = 
document.getElementById("profile")

if(btn){
btn.addEventListener("click", () => {
  
onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      document.getElementById("user").innerHTML = `${user.display}`

    } else {
      location.href = "./login.html";
      }
      });
      // Verify Email
      document.getElementById("verifyEmail").addEventListener("click", (e) => {
        e.preventDefault();

          sendEmailVerification(auth.currentUser)
              .then(() => {
                  alert("Verification email sent!");
                  const { value: email } =  Swal.fire({
                    title: "Input email address",
                    input: "email",
                    inputLabel: "Your email address",
                    inputPlaceholder: "Enter your email address"
                  });
                  if (email) {
                    Swal.fire(`Entered email: ${email}`);
                  }
                })
             });
               
            //  location.href = './info.html';
    //update profile
   document.getElementById("update").addEventListener('click', () => {
    updateProfile(auth.currentUser, {
      
       displayName: "qazi",
        photoURL:
          "https://cdn-icons-png.flaticon.com/256/3135/3135823.png"
      
    }).then(() => {
      const { value: url } =  Swal.fire({
        input: "url",
        inputLabel: "URL address",
        inputPlaceholder: "Enter the URL"
      });
      if (url) {
        Swal.fire(`Entered URL: ${url}`);
      }

      
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `Please enter a valid url path!`
    });
    });

  
  });
  //updateEmail
  document.getElementById("updateEmail").addEventListener('click', () => {
  updateEmail(auth.currentUser, "user@example.com").then(() => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Email Updated",
      showConfirmButton: false,
      timer: 1500
    });
  }).catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: `Please enter a valid email address.`
  });
  });
}
);
    //signOut
    document.getElementById('signOut').addEventListener('click', () => {
      signOut(auth).then(() => {
      
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Sign-out successful."
        });
        location.href = "./login.html";
      }).catch((error) => {
        // An error happened.
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: 'An error happened.'
        });
      });
    });


});
}