// Get references
const addBtn = document.getElementById('add-btn-task');
const searchBar = document.getElementById('search-bar');
const taskContainer = document.querySelector('.span-grid');

// Load tasks from localStorage on load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task button functionality
addBtn.addEventListener('click', function () {
    const taskText = prompt('Enter a new task:');
    if (taskText && taskText.trim() !== '') {
        addTask(taskText.trim());
        saveTask(taskText.trim());
    }
});

// Function to add a task card to the grid
function addTask(taskText) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('span-card');
    taskCard.textContent = taskText;

    // Optional: delete on double-click
    taskCard.addEventListener('dblclick', function () {
        if (confirm('Delete this task?')) {
            taskCard.remove();
            deleteTask(taskText);
        }
    });

    taskContainer.appendChild(taskCard);
}

// Save task to localStorage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => addTask(taskText));
}

// Delete task from localStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Search functionality
searchBar.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const taskCards = document.querySelectorAll('.span-card');

    taskCards.forEach(card => {
        const taskText = card.textContent.toLowerCase();
        if (taskText.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});
