//const userProfile = document.getElementById('user-profile');
  const logoutButton = document.getElementById('logout-button');

  userProfile.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      // Show the logout button
      logoutButton.classList.toggle('hidden');
      console.log("Loggin off");
    }
  });

  logoutButton.addEventListener('click', () => {
    // Clear the session storage
    sessionStorage.clear();

    // Redirect to the login page
    window.location.href = '/login.html';
  });