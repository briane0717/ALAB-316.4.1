console.log('my script is running')

const registrationForm = document.getElementById('registration')
console.log('form');
const uName = registrationForm.elements['username'];
const email = registrationForm.elements['email'];
const password = registrationForm.elements['password'];
const passwordCheck = registrationForm.elements['passwordCheck'];

registrationForm.addEventListener('submit', validate);

function validate(evt) {
    evt.preventDefault();
    const nameVal = validateName();
    if(nameVal === false) {
        return false;
    }

    // Simple email validation
    const emailVal = validateEmail();
    if(emailVal === false) {
        return false;
    }

    alert(`Name: ${nameVal}
        Email: ${emailVal}
        Password: ...that's a secret`);
    
    return true;
}

function validateName() {
    let nameVal = uName.value.trim(); 
    console.log("Input value (trimmed):", nameVal);
    if (nameVal.length < 4) {
        alert("Name must be at least four characters long.");
        uName.focus();
        return false;
    }

    // Check if name contains only alphanumeric characters (no special characters or whitespace)
    const isValid = /^[a-zA-Z0-9]+$/.test(nameVal);
    console.log("Regex test result:", isValid);  // Debugging log

    if (!isValid) {
        alert("The name cannot contain any special characters or whitespace.");
        uName.focus();
        return false;
    }
    // Check if name contains less than two unique characters
    const uniqueChars = new Set(nameVal);
if (uniqueChars.size < 2) {
    alert("The username must contain at least two unique characters.");
    uName.focus();
    return false;
}

     // Return the valid name if all checks pass
    return nameVal;  
}
// email validation
function validateEmail() {
    let emailVal = email.value;

    const atpos = emailVal.indexOf('@');
    const dotpos = emailVal.lastIndexOf('.');

    if (atpos < 1) {
        alert("Your email must include an @ symbol, which must not be at the beginning.");
        email.focus();
        return false;
    }

    if (dotpos - atpos < 2) {
        alert("Invalid structure: @. \n You must include a domain name after the @ symbol.")
        email.focus();
        return false;
    }

    return emailVal;
}