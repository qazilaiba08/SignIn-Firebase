

import { getAuth, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification } from "./firebase.js";

const auth = getAuth();
let profile = document.getElementById("profile");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);

        profile.innerText = ` 
          <section class="vh-100" style="background-color: #eee;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-md-9 col-lg-7 col-xl-5">
        <div class="card" style="border-radius: 15px; background-color: #93e2bb;">
          <div class="card-body p-4 text-black">
            <div>
              <h2 class="mb-4"> ${user.photoURL  || "User"}</h2>
              
            </div>
            <div class="d-flex align-items-center mb-4">
              <div class="flex-shrink-0">
                <img src="${user.photoURL || 'images.jfif'}"
                  alt="Generic placeholder image" class="img-fluid rounded-circle border border-dark border-3"
                  style="width: 70px;">
              </div>
              <div class="flex-grow-1 ms-3">
                <div class="d-flex flex-row align-items-center mb-2">
                  <p class="mb-0 me-2">Email: ${user.email}: ${user.emailVerified ? "Yes" : "No"}</p>
                  
                  </div>
                </div>
                <div>
                  <button  type="button" id="verifyEmail" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark btn-rounded btn-sm"
                    data-mdb-ripple-color="dark">Email Verified</button>
                  <button  type="button" id="update" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark btn-rounded btn-sm"
                    data-mdb-ripple-color="dark">update profile</button>
                     <button  type="button" id="updateEmail" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark btn-rounded btn-sm"
                    data-mdb-ripple-color="dark">EmailUpdate</button>
                  <button  type="button" id='signOut' data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark btn-floating btn-sm"
                    data-mdb-ripple-color="dark">signOut</button>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  </div>
</section>
 `;

        // Verify Email
        document.getElementById("verifyEmail").addEventListener("click", () => {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert("Verification email sent!");
                  });
               });
                 
              //  location.href = 'http://localhost:5000/';
      //update profile
     document.getElementById("update").addEventListener('click', () => {
      updateProfile(auth.currentUser, {
        displayName: user.displayName ,
         photoURL: user.photoURL 
      }).then(() => {
        console.log("Updated");
        
      }).catch((error) => {
        console.log(error);
        
      });

    
    });
    //updateEmail
    document.getElementById("updateEmail").addEventListener('click', () => {
    updateEmail(auth.currentUser, "user@example.com").then(() => {
    alert("Email updated")
    }).catch((error) => {
     alert(error)
    });
  }
);
      //signOut

} else {
location.href = "login.html";
}
});



