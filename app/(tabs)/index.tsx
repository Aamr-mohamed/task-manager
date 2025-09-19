import { TodoForm } from '@/components/todo/TodoForm';
import { TodoList } from '@/components/todo/TodoList';
import { AppColors } from '@/constants/app-theme';
import { TodoProvider, useTodos } from '@/contexts/TodoContext';
import { CreateTodoInput, Todo, UpdateTodoInput } from '@/types/todo';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function TodoApp(): React.JSX.Element {
  const { addTodo, updateTodo } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  const handleAddTodo = (data: CreateTodoInput) => {
    addTodo(data);
    setShowForm(false);
  };

  const handleUpdateTodo = (data: UpdateTodoInput) => {
    updateTodo(data);
    setEditingTodo(undefined);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTodo(undefined);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Task Manager</Text>
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}
          >
            <Ionicons name="add" size={24} color={AppColors.primary.main} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <TodoList onEditTodo={handleEditTodo} />
        </View>
      </SafeAreaView>

      {showForm && (
          <TodoForm
            todo={editingTodo}
            onSubmit={(data: CreateTodoInput | UpdateTodoInput) => {
              if (editingTodo) {
                handleUpdateTodo(data as UpdateTodoInput);
              } else {
                handleAddTodo(data as CreateTodoInput);
              }
            }}
            onCancel={handleCancelForm}
          />
        )}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  
  safeArea: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: AppColors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border.light,
  },

  title: {
    fontSize: 22,
    fontWeight: '400',
    color: AppColors.text.primary,
  },

  addButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },

  content: {
    flex: 1,
    paddingTop: 0,
  },
});
