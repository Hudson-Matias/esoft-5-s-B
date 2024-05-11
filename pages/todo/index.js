document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const mainContainer = document.querySelector("main");

    // Carregar tarefas salvas da localStorage ao carregar a página
    loadTodos();

    // Adicionar evento ao formulário para adicionar tarefa
    todoForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        const title = document.getElementById("title").value;
        const task = todoInput.value;

        if (task.trim() !== "") {
            addTodoToList(title, task);
            saveTodos(); // Salva a lista de tarefas na localStorage
            todoInput.value = ""; // Limpa o campo de entrada após adicionar a tarefa
        }
    });

    // Função para adicionar tarefa à lista
    function addTodoToList(title, task) {
        const todoContainer = document.createElement("div");
        const todoTitle = document.createElement("h1");
        const todoTask = document.createElement("p");

        todoTitle.textContent = title;
        todoTask.textContent = task;

        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoTask);
        mainContainer.appendChild(todoContainer);
    }

    // Função para salvar tarefas na localStorage
    function saveTodos() {
        const todoContainers = mainContainer.querySelectorAll("div");
        const todos = [];
        todoContainers.forEach(function (container) {
            const title = container.querySelector("h1").textContent;
            const task = container.querySelector("p").textContent;
            todos.push({ title, task });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Função para carregar tarefas da localStorage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos) {
            todos.forEach(function (todo) {
                addTodoToList(todo.title, todo.task);
            });
        }
    }
});

const lsVisistorsKey = '@visitorsCounter'

const defaultLsVisitors = {
  count: 0,
  lastVisit: getCurrentDateAndTime(),
}

function getCurrentDateAndTime() {
  const locale = 'pt-BR'
  const date = new Date()

  options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const time = new Intl.DateTimeFormat(locale, options).format(date)
  return time
}

function countVisitors() {
  const lsVisitors =
    localStorage.getItem(lsVisistorsKey) || JSON.stringify(defaultLsVisitors)
  const lsVisitorsObj = JSON.parse(lsVisitors)

  lsVisitorsObj.count++
  lsVisitorsObj.lastVisit = getCurrentDateAndTime()

  localStorage.setItem(lsVisistorsKey, JSON.stringify(lsVisitorsObj))

  const p = document.createElement('p')
  p.id = 'visitors-counter'
  p.textContent = `Esta página foi visitada ${lsVisitorsObj.count} vezes. A última visita foi: ${lsVisitorsObj.lastVisit}`

  const footer = document.querySelector('footer')

  footer.appendChild(p)
}

document.addEventListener('DOMContentLoaded', function () {
  countVisitors()
})