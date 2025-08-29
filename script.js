//Modal Message
function showModal(message, redirectUrl) {
    if (!message || message.trim() === "") return;

    const modal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.querySelector(".modal-close");

    modalMessage.textContent = message;
    modal.classList.add("show");  

    closeBtn.onclick = () => {
        modal.classList.remove("show");
        if (redirectUrl) window.location.href = redirectUrl;
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            if (redirectUrl) window.location.href = redirectUrl;
        }
    };

    setTimeout(() => {
        modal.classList.remove("show");
        if (redirectUrl) window.location.href = redirectUrl;
    }, 2000);
}


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

//Register Page
document.querySelector(".btn-register").addEventListener("click", function (e) {
    e.preventDefault();

    let username = document.getElementById("reguser").value.trim();
    let email = document.getElementById("regemail").value.trim();
    let password = document.getElementById("regpass").value.trim();

    if (!username || !email || !password) {
        showModal("Please fill in all registration fields.");
        return;
    }

    let user = {
        username: username,
        email: email,
        password: password 
    };

    //Save to LocalStorage
    localStorage.setItem("user", JSON.stringify(user));

    showModal("Registration successful! You can now log in.");
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
        showModal("No account found. Please register first.");
        return;
    }

    if (username === storedUser.username && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        showModal("Invalid username or password.");
    }
});
//Logout
const logoutBtn = document.querySelector(".btn-logout"); 
if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html";
    });
};
//To-Do
function openTask(title,description){
    const main = document.querySelector(".main-content")
    main.innerHTML = `
    <div class = "task-details">
    <h2>${title}</h2>
    <p>#{description}</p>
    <button onclick="backToTasks()">⬅ Back</button>
    </div>`
}
function backToTasks(){
    const main = document.querySelector(".main-content")
    main.innerHTML = `<div class="calendar-panel"></div>`
}

//Modal Task / Card Grid
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn-task");
  const taskModal = document.getElementById("taskModal"); 
  const closeModal = document.getElementById("closeModal"); 
  const saveTask = document.getElementById("saveTask"); 
  const taskGrid = document.getElementById("taskGrid"); 
  const taskTitle = document.getElementById("taskTitle"); 
  const taskDesc = document.getElementById("taskDesc"); 
  const emptyState = document.getElementById("empty-state"); 

  addBtn.addEventListener("click", () => {
    taskModal.classList.add("show");
    taskTitle.value = "";
    taskDesc.value = "";
  });

  closeModal.addEventListener("click", () => {
    taskModal.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === taskModal) {
      taskModal.classList.remove("show");
    }
  });

  // Save task
  saveTask.addEventListener("click", () => {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    if (title === "" || desc === "") {
      alert("Please fill out both fields.");
      return;
    }

    const card = document.createElement("div");
    card.classList.add("span-card");
    card.innerHTML = `
      <h4>${title}</h4>
      <p>${desc}</p>
    `;

    taskGrid.appendChild(card);

    emptyState.style.display = "none";

    taskModal.classList.remove("show");
  });
});