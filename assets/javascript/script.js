


let tasks = [
    { id: 1, description: 'Hacer mercado', completed: false },
    { id: 2, description: 'Hacer el desafio', completed: false },
    { id: 3, description: 'Sacar a pasear a Kyky', completed: false }
];
let taskId = tasks.length + 1;

function updateSummary() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

function addTask() {
    const taskDescription = document.getElementById('newTask').value.trim();
    if (taskDescription) {
        const newTask = {
            id: taskId++,
            description: taskDescription,
            completed: false
        };
        tasks.push(newTask);
        document.getElementById('newTask').value = '';
        renderTasks();
        updateSummary();
    }
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateSummary();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    updateSummary();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskRow = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = task.id;
        taskRow.appendChild(idCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = task.description;
        if (task.completed) {
            descriptionCell.classList.add('completed');
        }
        taskRow.appendChild(descriptionCell);

        const completedCell = document.createElement('td');
        const completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';
        completedCheckbox.checked = task.completed;
        completedCheckbox.onclick = () => toggleTaskCompletion(task.id);
        completedCell.appendChild(completedCheckbox);
        taskRow.appendChild(completedCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'x';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => deleteTask(task.id);
        deleteCell.appendChild(deleteButton);
        taskRow.appendChild(deleteCell);

        taskList.appendChild(taskRow);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateSummary();
});


