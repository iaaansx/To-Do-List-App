// ===== Modal Message =====
function showModal(message, redirectUrl) {
  if (!message || message.trim() === "") return;

  const modal = document.getElementById("customModal");
  const modalMessage = document.getElementById("modal-message");
  const closeBtn = document.querySelector(".modal-close");

  if (!modal || !modalMessage || !closeBtn) return; // prevents crash on index.html

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

  const addBtn = document.getElementById("add-btn-task");
  const mainContent = document.querySelector(".main-content");
  const taskGrid = document.getElementById("taskGrid");
  const emptyState = document.getElementById("empty-state");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function backToTasks() {
    mainContent.innerHTML = `<div class="calendar-panel"></div>`;
  }

  function renderTasks() {
    taskGrid.innerHTML = "";
    if (tasks.length === 0) {
      emptyState.classList.remove("hidden");
      return;
    }
    emptyState.classList.add("hidden");

    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.classList.add("span-card");
      card.innerHTML = `
        <div class="card-header">
          <h4>${task.title}</h4>
          <button class="delete-btn">❌</button>
        </div>
        <p>${task.desc}</p>
      `;

      // delete
      card.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      // double click = full view
      card.addEventListener("dblclick", () => {
        mainContent.innerHTML = `
          <div class="task-details">
            <h2>${task.title}</h2>
            <p>${task.desc}</p>
            <button id="backBtn">⬅ Back</button>
          </div>
        `;
        document.getElementById("backBtn").addEventListener("click", backToTasks);
      });

      taskGrid.appendChild(card);
    });
  }

  // Load tasks when page opens
  renderTasks();

  // Add task button
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

      if (title === "" || desc === "") {
        alert("Please fill out both fields.");
        return;
      }

      tasks.push({ title, desc });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      backToTasks();
    });

    document.getElementById("cancelTask").addEventListener("click", backToTasks);
  });
}

// ===== MAIN CONTENT NAVIGATION =====
const homeBtn = document.getElementById("home-btn");
const calendarBtn = document.getElementById("calendar-btn");
const inboxBtn = document.getElementById("inbox-btn");

const mainContent = document.querySelector(".main-content"); // global scope ✅

// ---- RENDER DASHBOARD ----
function renderDashboard() {
  const today = new Date();

  // --- Header (Month Year / Week) ---
  const options = { month: "long", year: "numeric" };
  const monthYear = today.toLocaleDateString("en-US", options);

  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDays = Math.floor((today - startOfYear) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);

  // --- Week Days (Mon → Sun) ---
  const weekDays = [];
  const currDay = today.getDay() === 0 ? 7 : today.getDay(); // Sunday fix
  const monday = new Date(today);
  monday.setDate(today.getDate() - currDay + 1);

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);

    const label = day.toLocaleDateString("en-US", { day: "2-digit", weekday: "short" });
    weekDays.push(`<div class="calendar-day"><span class="day-label">${label}</span></div>`);
  }

  // --- Render Dashboard ---
  mainContent.innerHTML = `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>${monthYear} / W${weekNum}</h2>
        <div class="dashboard-actions">
          <button class="nav-btn">←</button>
          <button class="nav-btn">→</button>
          <button class="today-btn">Today</button>
          <button class="share-btn">Share</button>
        </div>
      </div>

      <div class="calendar-week">
        ${weekDays.join("")}
      </div>

      <div class="dashboard-bottom">
        <div class="task-types">
          <h3>Task types</h3>
          <ul>
            <li><span class="dot red"></span> Data at risk</li>
            <li><span class="dot blue"></span> Meet</li>
            <li><span class="dot green"></span> Design team</li>
            <li><span class="dot purple"></span> Development team</li>
          </ul>
        </div>
        <div class="tasks-progress">
          <h3>Tasks in progress</h3>
          <div class="progress-cards">
            <div class="progress-card">
              <img src="https://via.placeholder.com/150" alt="task"/>
              <p><strong>Blog post</strong><br><small>In progress</small></p>
            </div>
            <div class="progress-card">
              <img src="https://via.placeholder.com/150" alt="task"/>
              <p><strong>Design session</strong><br><small>Completed</small></p>
            </div>
            <div class="progress-card">
              <img src="https://via.placeholder.com/150" alt="task"/>
              <p><strong>Develop meet</strong><br><small>In progress</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- EVENT LISTENERS ----

// Home View
if (homeBtn) {
  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    renderDashboard();
  });
}

// Calendar View
if (calendarBtn) {
  calendarBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainContent.innerHTML = `<div class="calendar-panel">📅 Calendar View Coming Soon</div>`;
  });
}

// Inbox View
if (inboxBtn) {
  inboxBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainContent.innerHTML = `<div class="inbox-panel">💬 Inbox View Coming Soon</div>`;
  });
}

// Auto-load Home on page load
document.addEventListener("DOMContentLoaded", () => {
  if (homeBtn) homeBtn.click();
});

// ===== SETTINGS PAGE ONLY =====
