function updateVisitCounter() {
    let visitData = localStorage.getItem('visitData');
    if (!visitData) {
        visitData = { count: 0, lastVisit: '' };
    } else {
        visitData = JSON.parse(visitData);
    }

    visitData.count++;
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    visitData.lastVisit = formatter.format(currentDate);

    localStorage.setItem('visitData', JSON.stringify(visitData));

    // Atualizar o texto no parágrafo de dados de visita
    const visitParagraph = document.getElementById('visit-data');
    visitParagraph.textContent = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;
}

// Chamada para atualizar o contador quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    updateVisitCounter();
});

document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const inputTodo = document.getElementById('todo-input');

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const todoText = inputTodo.value.trim();

        if (todoText !== '') {
            addToLocalStorage(todoText);
            inputTodo.value = '';
            displayTodos();
        }
    });

    function addToLocalStorage(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function displayTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const todoList = document.createElement('ul');

        todos.forEach(function (todo) {
            const todoItem = document.createElement('li');
            todoItem.textContent = todo;
            todoList.appendChild(todoItem);
        });

        document.querySelector('main').appendChild(todoList);
    }

    displayTodos();
});
