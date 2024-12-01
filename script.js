let todos = [];

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    render();
    updateCounter();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
    const text = prompt('Введіть текст нової справи:');
    if (text) {
        const newTask = {
            id: Date.now(),
            text,
            isCompleted: false
        };
        todos.push(newTask);
        saveTodos();
        render();
        updateCounter();
    }
}

function renderTodo(todo) {
    return `
        <li class="${todo.isCompleted ? 'completed' : ''}" data-id="${todo.id}">
            <input type="checkbox" ${todo.isCompleted ? 'checked' : ''} onclick="checkTodo(${todo.id})" />
            <label>${todo.text}</label>
            <button onclick="deleteTodo(${todo.id})">Видалити</button>
        </li>
    `;
}


function render() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = todos.map(renderTodo).join('');
}

function updateCounter() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.isCompleted).length;
    const remaining = total - completed;

    document.getElementById('total-counter').textContent = `Усього: ${total}`;
    document.getElementById('remaining-counter').textContent = `Залишилось: ${remaining}`;
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    render();
    updateCounter();
}

function checkTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.isCompleted = !todo.isCompleted;
        saveTodos();
        render();
        updateCounter();
    }
}

document.addEventListener('DOMContentLoaded', loadTodos);
