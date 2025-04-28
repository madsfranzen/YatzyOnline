// Get the navbar-right element (this is the first element with the 'navbar-right' class)
const navbarright = document.getElementsByClassName('navbar-right')[0];

// Create a login button element
const loginButton = document.createElement('button');
loginButton.textContent = 'Login'; // Set the button text

// Append the button to the navbar-right
navbarright.appendChild(loginButton);

