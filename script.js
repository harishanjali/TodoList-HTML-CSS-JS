const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from LocalStorage on startup
document.addEventListener('DOMContentLoaded', getTasks);

// Add task event
addBtn.addEventListener('click', () => {
    if (input.value.trim() === ""){
        alert('Please Enter text in input field');
        return;
    } 
    
    createTaskElement(input.value);
    saveLocalTasks(input.value);
    input.value = "";
});

// Create the task UI component
function createTaskElement(text) {
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    // Delete functionality
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeLocalTask(text);
    });
    
    todoList.appendChild(li);
}

// Local Storage: Save
function saveLocalTasks(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Local Storage: Load
function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

// Local Storage: Remove
function removeLocalTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

//onclick of enter button
window.addEventListener('keydown',function(event){
    if(event.key=='Enter'){
        if (input.value==''){
            alert('Please Enter text in input field');
            return;
        }
        createTaskElement(input.value);
        saveLocalTasks(input.value);
        input.value = "";
        
    }
})