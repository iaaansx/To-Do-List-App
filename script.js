// ===== Modal Message =====
function showModal(message, redirectUrl) {
  if (!message || message.trim() === "") return;

  const modal = document.getElementById("customModal");
  const modalMessage = document.getElementById("modal-message");
  const closeBtn = document.querySelector(".modal-close");

  if (!modal || !modalMessage || !closeBtn) return; // prevents index.html crash

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

// ===== LOGIN PAGE ONLY =====
if (document.querySelector(".login-container")) {
  const loginContainer = document.querySelector(".login-container");
  const registerBtn = document.querySelector(".reg");
  const loginBtn = document.querySelector(".log");

  registerBtn.addEventListener("click", () => {
    loginContainer.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    loginContainer.classList.remove("active");
  });

  // Register
  document.querySelector(".btn-register").addEventListener("click", function (e) {
    e.preventDefault();
    let username = document.getElementById("reguser").value.trim();
    let email = document.getElementById("regemail").value.trim();
    let password = document.getElementById("regpass").value.trim();

    if (!username || !email || !password) {
      showModal("Please fill in all registration fields.");
      return;
    }

    let user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    showModal("Registration successful! You can now log in.");
    document.getElementById("reguser").value = "";
    document.getElementById("regemail").value = "";
    document.getElementById("regpass").value = "";
  });

  // Login
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
}

// ===== INDEX PAGE ONLY =====
if (document.getElementById("add-btn-task")) {
  const logoutBtn = document.querySelector(".btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }

  function backToTasks() {
    document.querySelector(".main-content").innerHTML = `<div class="calendar-panel"></div>`;
  }

  const addBtn = document.getElementById("add-btn-task");
  const mainContent = document.querySelector(".main-content");
  const taskGrid = document.getElementById("taskGrid");
  const emptyState = document.getElementById("empty-state");

  addBtn.addEventListener("click", () => {
    mainContent.innerHTML = `
      <div class="task-form">
        <h3>Add New Task</h3>
        <input type="text" id="taskTitle" placeholder="Enter title" />
        <textarea id="taskDesc" placeholder="Enter description"></textarea>
        <button id="saveTask">Save Task</button>
        <button id="cancelTask">Cancel</button>
      </div>
    `;

    document.getElementById("saveTask").addEventListener("click", () => {
      const title = document.getElementById("taskTitle").value.trim();
      const desc = document.getElementById("taskDesc").value.trim();

      if (!title || !desc) {
        alert("Please fill out both fields.");
        return;
      }

      const card = document.createElement("div");
      card.classList.add("span-card");
      card.innerHTML = `<h4>${title}</h4><p>${desc}</p>`;

      taskGrid.appendChild(card);
      emptyState.classList.add("hidden");
      backToTasks();
    });

    document.getElementById("cancelTask").addEventListener("click", backToTasks);
  });
}
