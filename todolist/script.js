const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const progressBar = document.getElementById('progressBar');
const themeToggle = document.getElementById('themeToggle');

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const p = document.createElement("p");
    p.innerText = todo.text;

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✅";
    completeBtn.onclick = () => toggleComplete(i);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => editTask(i);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => deleteTask(i);

    li.appendChild(p);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
  updateProgress();
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTask() {
  if (inputBox.value.trim() === "") return;
  todos.push({ text: inputBox.value.trim(), completed: false });
  inputBox.value = "";
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function editTask(index) {
  let newText = prompt("Edit your task:", todos[index].text);
  if (newText) todos[index].text = newText;
  renderTodos();
}

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

function updateProgress() {
  let completed = todos.filter(t => t.completed).length;
  let percent = todos.length ? (completed / todos.length) * 100 : 0;
  progressBar.style.width = percent + "%";
}

addBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", renderTodos);

// 🌗 Dark / Light toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    document.body.style.background = "linear-gradient(135deg, #1f2937, #111827)";
    themeToggle.innerText = "☀️";
  } else {
    document.body.style.background = "linear-gradient(135deg, #7f5cff, #22d3ee)";
    themeToggle.innerText = "🌙";
  }
});
