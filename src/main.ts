import './style.css'

// struture of data schema
interface Todo { 
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = []

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;
const progressPercentage = document.getElementById('progress-percentage') as HTMLElement;

const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false
  }
  todos.push(newTodo);
  console.log(`Todo added: ${todos}`);

  renderTodos();
}

const updateProgress = (): void => {
  if (!progressBar || !progressPercentage) return;

  if (todos.length === 0) {
    progressBar.value = 0;
    progressPercentage.textContent = '0%';
    return;
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const percentage = Math.round((completedCount / todos.length) * 100);

  progressBar.value = percentage;
  progressPercentage.textContent = `${percentage}%`;
}


const renderTodos = (): void => {
  // clear the existing list - test later
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const lineThroughStyle = todo.completed ? 'text-decoration: line-through; color: #888;' : '';

    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} />
      <span style="${lineThroughStyle}">${todo.text}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Remove</button>
    `;

    addEditButtonListener(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    todoList.appendChild(li);

    updateProgress();

    addCheckboxListener(li, todo.id);
  })
}

renderTodos();

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();


  const text = todoInput.value.trim()
  
  if (text !== '') {
    addTodo(text)
    todoInput.value = ''
    // clear the input field after adding the todo
  }
})


const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => { 
  // Шукаємо чітко за класом .delete-btn
  const removeButton = li.querySelector('.delete-btn') as HTMLButtonElement;
  removeButton?.addEventListener('click', () => removeTodo(id));
}

const removeTodo = (id: number) => { 
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

const addCheckboxListener = (li: HTMLLIElement, id: number): void => {
  const checkbox = li.querySelector('input[type="checkbox"]');
  checkbox?.addEventListener('change', () => toggleTodo(id));
}

const toggleTodo = (id: number): void => {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

const addEditButtonListener = (li: HTMLLIElement, id: number): void => {
  const editButton = li.querySelector('.edit-btn') as HTMLButtonElement;
  editButton?.addEventListener('click', () => editTodo(id));
}

const editTodo = (id: number): void => {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const newText = prompt('Edit your todo:', todo.text);
  if (newText !== null && newText.trim() !== '') {
    todos = todos.map(t => t.id === id ? { ...t, text: newText.trim() } : t);
    renderTodos();
  }
}