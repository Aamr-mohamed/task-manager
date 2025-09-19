export type TodoPriority = 'low' | 'medium' | 'high' | 'critical';
export type TodoCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  category: TodoCategory;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority: TodoPriority;
  category: TodoCategory;
  dueDate?: Date;
}

export interface UpdateTodoInput {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: TodoPriority;
  category?: TodoCategory;
  dueDate?: Date;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (input: CreateTodoInput) => void;
  updateTodo: (input: UpdateTodoInput) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  getTodosByCategory: (category: TodoCategory) => Todo[];
  getTodosByPriority: (priority: TodoPriority) => Todo[];
  getCompletedTodos: () => Todo[];
  getPendingTodos: () => Todo[];
}

export interface TodoFilters {
  category?: TodoCategory;
  priority?: TodoPriority;
  completed?: boolean;
  searchTerm?: string;
}

export const TODO_PRIORITIES: TodoPriority[] = ['low', 'medium', 'high', 'critical'];
export const TODO_CATEGORIES: TodoCategory[] = ['work', 'personal', 'shopping', 'health', 'other'];

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical'
};

export const CATEGORY_LABELS: Record<TodoCategory, string> = {
  work: 'Work',
  personal: 'Personal',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other'
};
