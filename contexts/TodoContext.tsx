import {
  CreateTodoInput,
  Todo,
  TodoCategory,
  TodoContextType,
  TodoPriority,
  UpdateTodoInput
} from '@/types/todo';
import React, { createContext, useCallback, useContext, useReducer } from 'react';

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: UpdateTodoInput }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_TODOS'; payload: Todo[] };

// Reducer function for managing todo state
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [action.payload, ...state];
    
    case 'UPDATE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload, updatedAt: new Date() }
          : todo
      );
    
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      );
    
    case 'SET_TODOS':
      return action.payload;
    
    default:
      return state;
  }
}

// Generate unique ID for todos
function generateId(): string {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create the context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Custom hook to use the todo context
export function useTodos(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}

// Props for the provider
interface TodoProviderProps {
  children: React.ReactNode;
}

// Initial sample data for demonstration
const initialTodos: Todo[] = [
  {
    id: generateId(),
    title: 'Complete project presentation',
    description: 'Prepare slides and demo for the client meeting',
    completed: false,
    priority: 'critical',
    category: 'work',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
  },
  {
    id: generateId(),
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, and fruits',
    completed: true,
    priority: 'high',
    category: 'shopping',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: generateId(),
    title: 'Schedule dentist appointment',
    description: 'Annual checkup and cleaning',
    completed: false,
    priority: 'medium',
    category: 'health',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

// Todo Provider component
export function TodoProvider({ children }: TodoProviderProps): React.JSX.Element {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  const addTodo = useCallback((input: CreateTodoInput) => {
    const newTodo: Todo = {
      id: generateId(),
      ...input,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }, []);

  const updateTodo = useCallback((input: UpdateTodoInput) => {
    dispatch({ type: 'UPDATE_TODO', payload: input });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const getTodosByCategory = useCallback((category: TodoCategory): Todo[] => {
    return todos.filter(todo => todo.category === category);
  }, [todos]);

  const getTodosByPriority = useCallback((priority: TodoPriority): Todo[] => {
    return todos.filter(todo => todo.priority === priority);
  }, [todos]);

  const getCompletedTodos = useCallback((): Todo[] => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const getPendingTodos = useCallback((): Todo[] => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const contextValue: TodoContextType = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getTodosByCategory,
    getTodosByPriority,
    getCompletedTodos,
    getPendingTodos,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}
