console.log("My script is running");

const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");

// Registration form elements
const uName = registrationForm.elements["username"];
const email = registrationForm.elements["email"];
const password = registrationForm.elements["password"];
const passwordCheck = registrationForm.elements["passwordCheck"];

// Login form elements
const loginUser = loginForm.elements["username"];
const loginPassword = loginForm.elements["password"];
const keepLoggedIn = loginForm.elements["keepLoggedIn"];

// Event listeners for form submissions
registrationForm.addEventListener("submit", validateRegistration);
loginForm.addEventListener("submit", validateLogin);

// Registration validation
function validateRegistration(evt) {
  evt.preventDefault();

  const nameVal = validateName();
  if (!nameVal) return false;

  const emailVal = validateEmail();
  if (!emailVal) return false;

  const passwordVal = validatePassword(nameVal);
  if (!passwordVal) return false;

  if (localStorage.getItem(nameVal.toLowerCase())) {
    alert("Username is already taken.");
    uName.focus();
    return false;
  }

  storeUserData(nameVal, emailVal, passwordVal);
  clearFormFields();
}

// Validation helper functions
function validateName() {
  let nameVal = uName.value.trim().toLowerCase();
  if (!nameVal || nameVal.length < 4) {
    alert("Username must be at least four characters long.");
    uName.focus();
    return false;
  }

  if (!/^[a-zA-Z0-9]+$/.test(nameVal)) {
    alert("Username cannot contain special characters or whitespace.");
    uName.focus();
    return false;
  }

  if (new Set(nameVal).size < 2) {
    alert("Username must contain at least two unique characters.");
    uName.focus();
    return false;
  }

  return nameVal;
}

function validateEmail() {
  let emailVal = email.value.trim().toLowerCase();
  const excludedDomains = ["example.com"];
  const domain = emailVal.split("@")[1];

  if (excludedDomains.includes(domain)) {
    alert("Email cannot be from example.com.");
    email.focus();
    return false;
  }

  const atpos = emailVal.indexOf("@");
  const dotpos = emailVal.lastIndexOf(".");
  if (atpos < 1 || dotpos - atpos < 2) {
    alert("Please provide a valid email address.");
    email.focus();
    return false;
  }

  return emailVal;
}

function validatePassword(nameVal) {
  let passwordVal = password.value;
  const hasUpperCase = /[A-Z]/.test(passwordVal);
  const hasLowerCase = /[a-z]/.test(passwordVal);
  const hasNumber = /[0-9]/.test(passwordVal);
  const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(passwordVal);

  if (
    passwordVal.length < 12 ||
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumber ||
    !hasSpecialCharacter
  ) {
    alert(
      "Password must be at least 12 characters long, containing uppercase, lowercase, a number, and a special character."
    );
    password.focus();
    return false;
  }

  if (/password/i.test(passwordVal)) {
    alert("Password cannot contain the word 'password'.");
    password.focus();
    return false;
  }

  if (passwordVal === nameVal || passwordVal !== passwordCheck.value) {
    alert(
      "Password must be different from the username and match the confirmation."
    );
    passwordCheck.focus();
    return false;
  }

  return passwordVal;
}

function storeUserData(nameVal, emailVal, passwordVal) {
  localStorage.setItem(nameVal.toLowerCase(), passwordVal);
  localStorage.setItem(`${nameVal}_email`, emailVal);
}

function clearFormFields() {
  uName.value = "";
  email.value = "";
  password.value = "";
  passwordCheck.value = "";
}

// Login validation
function validateLogin(evt) {
  evt.preventDefault();

  const usernameVal = validateLoginUsername();
  if (!usernameVal) return false;

  const passwordVal = validateLoginPassword(usernameVal);
  if (!passwordVal) return false;

  clearLoginFields();
  showSuccessMessage();
}

// Login validation helpers
function validateLoginUsername() {
  let usernameVal = loginUser.value.trim();
  if (!usernameVal || !localStorage.getItem(usernameVal.toLowerCase())) {
    alert("Username does not exist.");
    loginUser.focus();
    return false;
  }

  return usernameVal;
}

function validateLoginPassword(usernameVal) {
  let passwordVal = loginPassword.value.trim();
  const storedPassword = localStorage.getItem(usernameVal.toLowerCase());

  if (!passwordVal || passwordVal !== storedPassword) {
    alert("Incorrect password.");
    loginPassword.focus();
    return false;
  }

  return passwordVal;
}

function showSuccessMessage() {
  let successMessage = "Login successful!";
  if (keepLoggedIn.checked) {
    successMessage += " You will stay logged in.";
  }

  alert(successMessage);
}

function clearLoginFields() {
  loginUser.value = "";
  loginPassword.value = "";
  keepLoggedIn.checked = false;
}

console.log("Login script is running");
