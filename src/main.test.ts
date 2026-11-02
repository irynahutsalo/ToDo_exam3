import { describe, it, expect } from 'vitest'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const addToDo = (todos: Todo[], text: string): Todo[] => {
  const newToDo:Todo = {
    id: 123,
    text,
    completed: false
  }
    return [...todos, newToDo]
}

const removeTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter(todo => todo.id !== id)
}

describe('addTodo', () => {
    it('should add a new todo to the list', () => {
        const todos: Todo[] = [];
        const result = addToDo(todos, 'Test todo');
        expect(result.length).toBe(1);
        expect(result[0].text).toBe('Test todo');
        expect(result[0].completed).toBe(false);
    })
})


describe('Todo App Core Logic & Features', () => {

  // Test 0: Add Todo
  it('should add a new todo to the list', () => {
    const todos: Todo[] = [];
    const result = addToDo(todos, 'Test todo');
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Test todo');
    expect(result[0].completed).toBe(false);
  })

  // Test 1: Toggling todo completion status immutably
  it('should toggle the completed status of a specific todo item', () => {
    let todos: Todo[] = [
      { id: 1, text: 'Learn TypeScript', completed: false },
      { id: 2, text: 'Build Todo App', completed: true }
    ];

    const toggleTodo = (id: number) => {
      todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    };

    toggleTodo(1);

    expect(todos[0].completed).toBe(true);
    expect(todos[1].completed).toBe(true);
  });

  // Test 2: Calculating progress percentage correctly
  it('should calculate the correct completion percentage', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: true },
      { id: 3, text: 'Task 3', completed: false },
      { id: 4, text: 'Task 4', completed: false }
    ];

    const calculateProgress = (items: Todo[]): number => {
      if (items.length === 0) return 0;
      const completedCount = items.filter(todo => todo.completed).length;
      return Math.round((completedCount / items.length) * 100);
    };

    const percentage = calculateProgress(todos);

    expect(percentage).toBe(50);
  });

  // Test 3: Handling empty todo list for progress calculation
  it('should return 0% progress when the todo list is empty', () => {
    const todos: Todo[] = [];

    const calculateProgress = (items: Todo[]): number => {
      if (items.length === 0) return 0;
      const completedCount = items.filter(todo => todo.completed).length;
      return Math.round((completedCount / items.length) * 100);
    };

    expect(calculateProgress(todos)).toBe(0);
  });

  // Test 4: Removing a todo item using filter 
  it('should remove a todo item by its id', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Task 1', completed: false },
      { id: 2, text: 'Task 2', completed: false }
    ];

    const result = removeTodo(todos, 1);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });

});

