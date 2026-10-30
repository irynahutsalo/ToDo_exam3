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

const renderTodos = (): void => {
  // clear the existing list - test later
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} />
      <span>${todo.text}</span>
      <button>Remove</button>
    `;

    addRemoveButtonListener(li, todo.id);
    todoList.appendChild(li);

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
  const removeButton = li.querySelector('button');
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