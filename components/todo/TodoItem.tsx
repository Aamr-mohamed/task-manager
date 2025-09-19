import { AppColors } from '@/constants/app-theme';
import { Todo } from '@/types/todo';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps): React.JSX.Element {
  const handlePress = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDelete(todo.id)
        },
      ]
    );
  };

  const isOverdue = todo.dueDate && new Date() > todo.dueDate && !todo.completed;

  return (
    <View style={[
      styles.container,
      todo.completed && styles.completedContainer
    ]}>
      <TouchableOpacity 
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.mainContent}>
          <View style={styles.titleRow}>
            <View style={styles.checkboxContainer}>
              <Ionicons
                name={todo.completed ? 'checkmark-circle' : 'radio-button-off'}
                size={20}
                color={todo.completed ? AppColors.status.completed : AppColors.text.tertiary}
              />
            </View>
            <Text style={[
              styles.title,
              todo.completed && styles.completedTitle
            ]}>
              {todo.title}
            </Text>
          </View>

          {todo.description && (
            <Text style={[
              styles.description,
              todo.completed && styles.completedDescription
            ]}>
              {todo.description}
            </Text>
          )}

          {todo.dueDate && (
            <View style={styles.dueDateContainer}>
              <Ionicons 
                name="time-outline" 
                size={14} 
                color={isOverdue ? AppColors.status.overdue : AppColors.text.tertiary}
              />
              <Text style={[
                styles.dueDateText,
                isOverdue && styles.overdueDateText
              ]}>
                {todo.dueDate.toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(todo)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="create-outline" size={18} color={AppColors.text.secondary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={18} color={AppColors.text.secondary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    marginVertical: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  completedContainer: {
    opacity: 0.9,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxContainer: {
    marginTop: 2,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: AppColors.text.primary,
    lineHeight: 22,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: AppColors.text.tertiary,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: AppColors.text.secondary,
    lineHeight: 20,
  },
  completedDescription: {
    color: AppColors.text.tertiary,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  dueDateText: {
    fontSize: 12,
    color: AppColors.text.secondary,
  },
  overdueDateText: {
    color: AppColors.status.overdue,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
  },
});
