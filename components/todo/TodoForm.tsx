import { AppColors } from '@/constants/app-theme';
import {
  CATEGORY_LABELS,
  CreateTodoInput,
  PRIORITY_LABELS,
  Todo,
  TODO_CATEGORIES,
  TODO_PRIORITIES,
  TodoCategory,
  TodoPriority,
  UpdateTodoInput
} from '@/types/todo';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface TodoFormProps {
  todo?: Todo; // If provided, we're editing; otherwise, creating
  onSubmit: (data: CreateTodoInput | UpdateTodoInput) => void;
  onCancel: () => void;
}



export function TodoForm({ todo, onSubmit, onCancel }: TodoFormProps): React.JSX.Element {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [priority, setPriority] = useState<TodoPriority>(todo?.priority || 'medium');
  const [category, setCategory] = useState<TodoCategory>(todo?.category || 'other');
  const [dueDate, setDueDate] = useState<Date | undefined>(todo?.dueDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isEditing = !!todo;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Task title is required!';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (description && description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    if (dueDate && dueDate < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formData = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      dueDate,
    };

    if (isEditing) {
      onSubmit({ ...formData, id: todo.id } as UpdateTodoInput);
    } else {
      onSubmit(formData as CreateTodoInput);
    }
  };

  const removeDueDate = () => {
    setDueDate(undefined);
    setErrors(prev => ({ ...prev, dueDate: '' }));
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {isEditing ? 'Edit Task' : 'New Task'}
            </Text>
            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Task Title *</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.title ? styles.textInputError : styles.textInputNormal
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title..."
              placeholderTextColor="#9CA3AF"
              maxLength={100}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[
                styles.textInput,
                styles.textInputMultiline,
                errors.description ? styles.textInputError : styles.textInputNormal
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your task..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              maxLength={200}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>{description.length}/200</Text>
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Priority Level</Text>
            <View style={styles.optionsContainer}>
              {TODO_PRIORITIES.map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.optionButton,
                    priority === p ? styles.optionButtonSelected : null
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text style={[
                    styles.optionButtonText,
                    priority === p ? { color: AppColors.text.inverse } : null
                  ]}>
                    {PRIORITY_LABELS[p]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.optionsContainer}>
              {TODO_CATEGORIES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.optionButton,
                    category === c ? styles.optionButtonSelected : null
                  ]}
                  onPress={() => setCategory(c)}
                >
                  <Text style={[
                    styles.optionButtonText,
                    category === c ? { color: AppColors.text.inverse } : null
                  ]}>
                    {CATEGORY_LABELS[c]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Due Date</Text>
            <View style={styles.dueDateContainer}>
              <TouchableOpacity 
                style={[
                  styles.dueDateButton,
                  errors.dueDate ? styles.textInputError : styles.textInputNormal
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#3B82F6" />
                <Text style={styles.dueDateText}>
                  {dueDate ? dueDate.toLocaleDateString() : 'Set due date'}
                </Text>
              </TouchableOpacity>
              {dueDate && (
                <TouchableOpacity onPress={removeDueDate} style={styles.removeDateButton}>
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
            {errors.dueDate && <Text style={styles.errorText}>{errors.dueDate}</Text>}
            
            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <Text style={styles.datePickerTitle}>Select a future date:</Text>
                <TouchableOpacity 
                  style={styles.datePickerButton}
                  onPress={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDueDate(tomorrow);
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={styles.datePickerButtonText}>Tomorrow</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.datePickerButton}
                  onPress={() => {
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    setDueDate(nextWeek);
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={styles.datePickerButtonText}>Next Week</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.datePickerButton}
                  onPress={() => {
                    const nextMonth = new Date();
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    setDueDate(nextMonth);
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={styles.datePickerButtonText}>Next Month</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.datePickerCancelButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.datePickerCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {isEditing ? 'Update Task' : 'Create Task'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    margin: 16,
    maxHeight: '80%',
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  scrollView: {
    maxHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: AppColors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  inputSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.text.primary,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: AppColors.text.primary,
    backgroundColor: AppColors.background.primary,
  },
  textInputNormal: {
    borderColor: AppColors.border.light,
  },
  textInputError: {
    borderColor: AppColors.status.overdue,
  },
  textInputMultiline: {
    minHeight: 80,
  },
  characterCount: {
    fontSize: 12,
    color: AppColors.text.secondary,
    textAlign: 'right',
    marginTop: 4,
  },
  errorText: {
    color: AppColors.status.overdue,
    fontSize: 12,
    marginTop: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    backgroundColor: AppColors.background.tertiary,
  },
  optionButtonSelected: {

    backgroundColor: AppColors.primary.main,
    elevation: 4,
    transform: [{ scale: 1.05 }],
  },
  optionButtonUnselected: {
    opacity: 0.8,
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dueDateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  dueDateText: {
    fontSize: 16,
    color: '#111827',
  },
  removeDateButton: {
    padding: 4,
  },
  datePickerContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    gap: 8,
  },
  datePickerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  datePickerButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  datePickerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  datePickerCancelButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  datePickerCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    padding: 24,
    paddingTop: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});