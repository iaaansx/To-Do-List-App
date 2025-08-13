//Login Page
const loginContainer = document.querySelector('.login-container')
const registerBtn = document.querySelector('.reg')
const loginBtn = document.querySelector('.log')

registerBtn.addEventListener('click',()=>{
   loginContainer.classList.add('active') 
})

loginBtn.addEventListener('click',()=>{
    loginContainer.classList.remove('active')
})

//Register
document.querySelector(".btn-register").addEventListener("click", function (e) {
    e.preventDefault();

    let username = document.getElementById("reguser").value.trim();
    let email = document.getElementById("regemail").value.trim();
    let password = document.getElementById("regpass").value.trim();

    if (!username || !email || !password) {
        alert("Please fill in all registration fields.");
        return;
    }

    let user = {
        username: username,
        email: email,
        password: password 
    };

    //Save to LocalStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! You can now log in.");
    document.getElementById("reguser").value = "";
    document.getElementById("regemail").value = "";
    document.getElementById("regpass").value = "";
});

//Login
document.querySelector(".btn-login").addEventListener("click", function (e) {
    e.preventDefault();

    let username = document.getElementById("loguser").value.trim();
    let password = document.getElementById("logpass").value.trim();

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No account found. Please register first.");
        return;
    }

    if (username === storedUser.username && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
});

//Keep Logged In
window.onload = function () {
    if (localStorage.getItem("loggedIn") === "true") {
        window.location.href = "index.html";
    }
};

document.querySelector(".logout-btn").addEventListener("click", function(e){
    e.preventDefault();

    localStorage.removeItem("loggedIn");

    alert("You have been logged out.")

    window.location.href = "login.html";
})