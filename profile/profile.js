
// Add this script in your home.html page

  // Wait until the DOM is fully loaded
//   document.addEventListener("DOMContentLoaded", function() {
    
// // Add this script in your home.html page
//     const userProfile = document.getElementById('user-profile');
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     if (currentUser) {
//       console.log("User Details", currentUser);
//       userProfile.querySelector('img').src = `../images/${currentUser.profile_picture}`;
//       userProfile.querySelector('#user-name').textContent = `Welcome ${currentUser.name.split(' ')[0]}`;
//     } else {
//       userProfile.style.display = 'none'; // Hide the user profile section if no user is logged in
//     }
  
  
//   });  

// function showUserProfileDetails() {
//   const userProfile = document.getElementById('user-profile');
    
//   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

//   if (currentUser) {
//     console.log("User Details", currentUser);
//     userProfile.querySelector('img').src = `../images/${currentUser.profile_picture}`;
//     userProfile.querySelector('#user-name').textContent = `Welcome ${currentUser.name.split(' ')[0]}`;

//   } else {
//     userProfile.style.display = 'none'; // Hide the user profile section if no user is logged in
//   }
// }

// // Wait until the DOM is fully loaded to call the function
// document.addEventListener("DOMContentLoaded", function() {
//   showUserProfileDetails();
// });


// function loadUserProfile() {    
//   const userProfile = document.getElementById('user-profile');
//   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//   console.log('The page has been loaded');
  
//   if (currentUser) {
//     console.log("User Details", currentUser);
//     userProfile.querySelector('img').src = `../images/${currentUser.profile_picture}`;
//     userProfile.querySelector('#user-name').textContent = `Welcome ${currentUser.name.split(' ')[0]}`;
//   } else {
//     userProfile.style.display = 'none'; 
//     // Hide the user profile section if no user is logged in
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   loadUserProfile();
//   console.log('The DOM content has been loaded');
// });  



// const userProfile = document.getElementById('user-profile');
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     // Check that currentUser body is not null
//     if(currentUser && Object.keys(currentUser).length > 0){
//       console.log("User Details", currentUser);
//       userProfile.querySelector('img').src = `../images/${currentUser.profile_picture}`;
//       userProfile.querySelector('#user-name').textContent = `Welcome ${currentUser.name.split(' ')[0]}`;
//     } else {
//       userProfile.style.display = 'none'; // Hide the user profile section if no user is logged in
//     }


// // Wait until the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", function() {
//   const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//   if (currentUser) {
//     console.log("User Details", currentUser);
//     userProfile.querySelector('img').src = `../images/${currentUser.profile_picture}`;
//     userProfile.querySelector('#user-name').textContent = `Welcome ${currentUser.name.split(' ')[0]}`;
//   } else {
//     userProfile.style.display = 'none'; // Hide the user profile section if no user is logged in
//   }
// }); 


function loadUserProfile() {
  const userProfile = document.getElementById('user-profile');
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
  if (currentUser) {
    console.log("User Details", currentUser);
    userProfile.querySelector('img').src = `../images/${currentUser.profile_picture}`;
    userProfile.querySelector('#user-name').textContent = `Welcome ${currentUser.name.split(' ')[0]}`;
  } else {
    userProfile.style.display = 'none'; // Hide the user profile section if no user is logged in
  }
}

if (document.readyState === 'loading') {
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', loadUserProfile);
} else {
  // `DOMContentLoaded` has already fired
  loadUserProfile();
}

