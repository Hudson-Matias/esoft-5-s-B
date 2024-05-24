document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const mainContainer = document.querySelector("main");
  const todoList = document.getElementById("todo-list");
  const editDialog = document.getElementById("edit-dialog");
  const editForm = document.getElementById("edit-form");
  const editTitle = document.getElementById("edit-title");
  const editDescription = document.getElementById("edit-description");
  let currentTodo;

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
      const todoItem = document.createElement("li");
      const todoContent = document.createElement("div");
      const todoTitle = document.createElement("h1");
      const todoTask = document.createElement("p");
      const editButton = document.createElement("button");

      todoTitle.textContent = title;
      todoTask.textContent = task;
      editButton.innerHTML = "✏️";
      editButton.classList.add("edit-button");
      editButton.title = "Editar tarefa";
      editButton.addEventListener("click", () => openEditDialog(todoItem));

      todoContent.appendChild(todoTitle);
      todoContent.appendChild(todoTask);
      todoItem.appendChild(todoContent);
      todoItem.appendChild(editButton);
      todoList.appendChild(todoItem);
  }

  // Função para abrir o diálogo de edição
  function openEditDialog(todoItem) {
      currentTodo = todoItem;
      const title = todoItem.querySelector("h1").textContent;
      const description = todoItem.querySelector("p").textContent;

      editTitle.value = title;
      editDescription.value = description;

      editDialog.showModal();
  }

  // Evento de submit do formulário de edição
  editForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const newTitle = editTitle.value;
      const newDescription = editDescription.value;

      currentTodo.querySelector("h1").textContent = newTitle;
      currentTodo.querySelector("p").textContent = newDescription;

      editDialog.close();
      saveTodos();
  });

  // Evento de reset do formulário de edição para fechar o diálogo
  editForm.addEventListener("reset", function () {
      editDialog.close();
  });

  // Função para salvar tarefas na localStorage
  function saveTodos() {
      const todoItems = todoList.querySelectorAll("li");
      const todos = [];
      todoItems.forEach(function (item) {
          const title = item.querySelector("h1").textContent;
          const task = item.querySelector("p").textContent;
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
