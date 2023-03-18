const username = "admin@gmail.com";
const password = "admin123@#";

const form = document.getElementById('form');
const passwordInput = document.getElementById('password');
const emailInput = document.querySelector("#email");
const message = document.querySelector(".message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);


  // Trim removes white space from both ends of the string
  const enteredUsername = formData.get('email');
  const enteredPassword = formData.get('password');
  

  if (!emailValue || !validateEmail(emailValue)) {
    emailInput.classList.add('is-invalid');
    emailInput.nextElementSibling.textContent = 'Please enter a valid email';
  } else if (!passwordValue) {
      passwordInput.classList.add('is-invalid');
      passwordInput.nextElementSibling.textContent = 'Password cannot be empty';
  } 

});

//Clear input validation once user starts typing again
[passwordInput, emailInput].forEach(node => {
    node.addEventListener('input', () => {
        if (node.classList.contains('is-invalid')) {
            node.classList.remove('is-invalid');
            node.nextElementSibling.textContent = '';
        }
    });
});

function validateEmail(email) {
  // Email regular expression
  const re = /^\S+@\S+\.\S+$/;
  return re.test(String(email).toLowerCase());
}

const container = document.getElementById('weather-predictor');
const numDrops = 100;

for (let i = 0; i < numDrops; i++) {
  const drop = document.createElement('span');
  drop.classList.add('raindrop');
  drop.style.left = `${Math.random() * 100}%`;
  drop.style.animationDelay = `${Math.random()}s`;
  container.appendChild(drop);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const enteredUsername = emailInput.value.trim();
  const enteredPassword = passwordInput.value.trim();

  const user = authenticateUser(enteredUsername , enteredPassword);
  
  if (user) {
    showNotification('Login successful!', 'green');
    
    // Set the current user in session storage
sessionStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect to index.html
    window.location.pathname = 'home/index.html';

  } else {
    showNotification('Invalid username or password.', 'red');
  }
});

function getName(name) {
  return name.includes(' ') ? name.split(' ')[0] : name;
}

function showNotification(message, color) {
  const notification = document.getElementById('notification');
  notification.classList.remove('hidden');
  notification.style.display = 'flex';
  const cardBody = notification.querySelector('.card-body');
  cardBody.textContent = message;
  cardBody.style.backgroundColor = color;
  setTimeout(() => {
    notification.classList.add('hidden');
    notification.style.display = 'none';
  }, 3000);
}

function authenticateUser(email, password) {
  // Search the users array for matching email and password
  const user = users.find((user) => {
    return user.username === email && user.password === password;
  });

  return user || false;
}

const users = [
  { username: "admin1@gmail.com", password: "admin123@#", name: "Pinky", profile_picture: "admin1.jpg" },
  { username: "admin2@gmail.com", password: "admin456@#", name: "Admin Two", profile_picture: "admin2.jpg" },
  { username: "user1@gmail.com", password: "user1234@", name: "User One", profile_picture: "user1.jpg" },
  { username: "user2@gmail.com", password: "user5678#", name: "User Two", profile_picture: "user2.jpg" },
];
