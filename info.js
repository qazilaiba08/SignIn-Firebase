

import { getAuth, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification,signOut  } from "./firebase.js";

const auth = getAuth();
const profile =  document.getElementById('profile')


  
onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      console.log(uid,user);
      
     profile.innerHTML = `
      <div class="flex flex-no-wrap " id="profile">
    <div class="w-64 bg-gray-800 h-screen shadow-lg hidden lg:block">
      <div class="p-6">
        <h1 class="text-white text-2xl font-bold">Dashboard</h1>
      </div>
      <nav class="mt-8 grid-cols-1">
       <a href="" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-700">Home</a></button>
       <a href="" id="update" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-700">Profile ${user.photoURL}</a>
       <a href=""id="updateEmail" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-700">Email:${user.email} </a>
       <a href=""  id="verifyEmail"class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-700">Verify Email: ${  user.verifyEmail ? "yes" : "no"}</a>
       <a href="login.html" id='signOut' class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-700">Logout</a>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col w-full lg:ml-84">

      <!-- Top Bar -->
      <header class="w-full bg-white shadow p-4 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>
       <button type="button"  id="update"><div class="flex items-center ">
          <span class="text-gray-700 font-semibold mr-4" id="user">Hello,${user.displayName} </span>
          <img src="${user.photoURL}" alt="User Avatar" class="w-10 h-10 rounded-full">
        </div></button> 
      </header>

      <!-- Dashboard Content -->
      <main class="flex-2 overflow-auto p-6">
        <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-9">
          
        
          <!-- Card 1 -->
          <div class="bg-white shadow-lg rounded-lg p-5">
            <h3 class="text-lg font-semibold text-gray-800">Landing Pages</h3>
            <p class="text-gray-600 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia deleniti sunt excepturi eius pariatur et eveniet nulla quidem sit optio
               illum, impedit totam odio beatae dicta. Delectus voluptatem porro molestiae!</p>
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEm5bIFNrFmxN2v53MWgNt2Tb0Fu4sIJ6YDQ&s" alt="User Avatar" class="w-50 h-50 square-full">
               
          </div>

          <!-- Card 2 -->
          <div class="bg-white shadow-lg rounded-lg p-5">
           <h3 class="text-lg font-semibold text-gray-800">Graph </h3>
              <p class="text-gray-600 mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ratione enim mollitia, quia reprehenderit nostrum in consequuntur repellat 
              qui architecto inventore laudantium cumque! Quibusdam placeat nisi dolore!</p>
             <img src="https://www.wrappixel.com/wp-content/uploads/2023/11/spike-nextjs-free.jpg" class="w-50 h-50 square-full ">
          </div>

          <!-- Card 3 -->
          <div class="bg-white shadow-lg rounded-lg p-5">
            <h3 class="text-lg font-semibold text-gray-800">Web Developer</h3>
            <p class="text-gray-600 mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ratione enim mollitia, quia reprehenderit nostrum in consequuntur repellat 
              qui architecto veritatis debitis itaque inventore laudantium cumque! Quibusdam placeat nisi dolore!</p>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBoX1aS7Tn0ZjoRvTvjShnG7iWtLwGjpBIQQ&s" class="w-50 h-50 square-full ">
          </div>
          

          <!-- Add more cards as needed -->
        </div>
      </main>
      
      </div>
    </div>
  </div>`

       
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
              
            })
         });
         updateEmail(auth.currentUser, "user@example.com").then(() => {
          Swal.fire(`Entered email: ${email}`);
        }).catch((error) => {
        console.log(error);
        
        });
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
  
    //signOut
    document.getElementById('signOut').addEventListener('click', (e) => {
      e.preventDefault();
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
  } else {
    location.href = "./login.html";
    }
    });
    