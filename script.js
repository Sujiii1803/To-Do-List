let tasks = JSON.parse(localStorage.getItem("todoList")) || [];

function saveTasks() {
  localStorage.setItem("todoList", JSON.stringify(tasks));
  updateCount();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">🗑</button>
    `;
    taskList.appendChild(li);
  });
}

function updateCount() {
  const taskCount = document.getElementById("taskCount");
  const remaining = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `You have ${remaining} task${remaining !== 1 ? 's' : ''} left`;
}

// Initial render
renderTasks();
updateCount();
