// promenlivi
let validInformations = true;
let userBase = [];
let passBase = [];
let emailBase = [];
let ageBase = [];
let usernameRegisterInput = document.getElementById("usernameRegisterInput");
let passwordRegisterInput = document.getElementById("passwordRegisterInput");
let emailInput = document.getElementById("emailInput");
let ageInput = document.getElementById("ageInput");
let usernameError = document.getElementById("usernameError");
let passwordError = document.getElementById("passwordError");
let emailError = document.getElementById("emailError");
let ageError = document.getElementById("ageError");
let loginUsernameInput = document.getElementById("usernameInput");
let loginPasswordInput = document.getElementById("passwordInput");
let loginUsernameErrorMessage = document.getElementById("usernameLoginError");
let loginPasswordErrorMessage = document.getElementById("passwordLoginError");

// funkcii
function checkInformationUsername(input, Length, errorMessage, informacija, base) {
    if (input.length > Length) {
        usernameError.innerText = errorMessage;
        validInformations = false;
        return false;
    } else {
        base.push({ [informacija]: input });
        usernameError.innerText = "";
        return true;
    }
}
function checkInformationPassword(input, length, errorMessage, informacija, base) {
    if (input.length < length) {
        passwordError.innerText = errorMessage;
        validInformations = false;
        return false;
    } else {
        base.push({ [informacija]: input });
        passwordError.innerText = "";
        return true;
    }
}
function checkInformationEmail(input, errorMessage, informacija, base) {
    if (!input.includes("@gmail.com")) {
        emailError.innerText = errorMessage;
        validInformations = false;
        return false;
    } else {
        base.push({ [informacija]: input });
        emailError.textContent = "";
        return true;
    }
}
function checkInformationAge(input, errorMessage, informacija, base) {
    if (input < 18) {
        ageError.innerText = errorMessage;
        validInformations = false;
        return false;
    } else {
        base.push({ [informacija]: input });
        ageError.innerText = "";
        return true;
    }
}

document.getElementById("registerButton").addEventListener("click", function () {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
});
document.getElementById("registrationButton").addEventListener("click", function () {
    validInformations = true;
    checkInformationUsername(usernameRegisterInput.value, 25, "Dolg username", "username", userBase);
    checkInformationPassword(passwordRegisterInput.value, 8, "Pasvordot treba da ima barem 8 karakteri", "password", passBase);
    checkInformationEmail(emailInput.value, "vnesi validna email adresa", "email", emailBase);
    checkInformationAge(ageInput.value, "moras da imas 18 godini za da se registriras", "age", ageBase);
    if (validInformations) {
        document.getElementById("login-form").style.display = "block";
        document.getElementById("register-form").style.display = "none";
    }
});
loginButton.addEventListener("click", function(){
    let username = loginUsernameInput.value;
    let password = loginPasswordInput.value;
    let usernameFinder = userBase.find(user => user.username === username);
    if (!usernameFinder) {
        loginUsernameErrorMessage.innerText = "Username koj go vnesite ne e pronajden";  
    } else {
        loginUsernameErrorMessage.innerText = "";
    }
    let passwordFinder = passBase.find(pass => pass.password === password);
    if (!passwordFinder) {
        loginPasswordErrorMessage.innerText = "Pasvordot koj go vnesovte ne e tocen";
    } else {
        loginPasswordErrorMessage.innerText = "";
    }
    if (usernameFinder && passwordFinder) {
        alert("Dobredojde vo admin panelot");
    }
});

// console.log(userBase);
// console.log(passBase);
// console.log(emailBase);
// console.log(ageBase);