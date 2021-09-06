// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const mainBox = document.querySelector('.main-box')

// Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);


// Functions

function addTodo(event) {
    // Prevent from submitting
    event.preventDefault();

    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); // ---> Sticks the li inside the div

    // Add to-do to local storage
    saveLocalTodos(todoInput.value);

    // Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<span class="material-icons-sharp">check</span>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<span class="material-icons-sharp">delete</span>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear To-do Input Value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    // Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        const todoNext = todo.nextElementSibling;
        if (todoNext !== null) {
            todoNext.classList.add('fall-next');
        }
        if (todoNext === null) {
            mainBox.classList.add('fall-main-box');
        }
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
            if (todoNext !== null) {
                todoNext.classList.remove('fall-next'); // --> Adds a top border to a todo when the previous item falls down
            }
            if (todoNext === null) {
                mainBox.classList.remove('fall-main-box'); // --> Adds a bottom border to the main box when the last item falls down
            }
        })
    }

    // Checkmark Todo
    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//  Filter

function filterTodo(e) {
    const todos = todoList.childNodes;
    var todosArray = Array.from(todos);
    todosArray.shift();
    todosArray.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//  Local Server

function saveLocalTodos(todo) {

    // Check todos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));   
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {

     // Check todos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));   
    }
    todos.forEach(function (todo) {
    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); // Sticks the li inside the div
    
    // Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<span class="material-icons-sharp">check</span>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<span class="material-icons-sharp">delete</span>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    
    // Append to list
    todoList.appendChild(todoDiv); 
    })
}

function removeLocalTodos(todo) {

    // Check todos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));   
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}