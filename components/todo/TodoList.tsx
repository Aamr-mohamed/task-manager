import { AppColors } from '@/constants/app-theme';
import { useTodos } from '@/contexts/TodoContext';
import { CATEGORY_LABELS, PRIORITY_LABELS, Todo, TODO_CATEGORIES, TODO_PRIORITIES, TodoFilters } from '@/types/todo';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  onEditTodo: (todo: Todo) => void;
}



export function TodoList({ onEditTodo }: TodoListProps): React.JSX.Element {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const [filters, setFilters] = useState<TodoFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(term) ||
        (todo.description && todo.description.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(todo => todo.category === filters.category);
    }

    // Priority filter
    if (filters.priority) {
      result = result.filter(todo => todo.priority === filters.priority);
    }

    // Completion status filter
    if (filters.completed !== undefined) {
      result = result.filter(todo => todo.completed === filters.completed);
    }

    // Sort by priority (critical -> low), then by creation date
    result.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [todos, filters, searchTerm]);

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = todos.filter(t => 
      t.dueDate && new Date() > t.dueDate && !t.completed
    ).length;

    return { total, completed, pending, overdue };
  }, [todos]);

  const renderTodo = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
      onEdit={onEditTodo}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyEmoji}>📋</Text>
      <Text style={styles.emptyTitle}>
        No Tasks Found
      </Text>
      <Text style={styles.emptyDescription}>
        {searchTerm || Object.keys(filters).length > 0
          ? 'Try adjusting your filters to find your tasks'
          : 'Create your first task to get started!'
        }
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.statsHeader}>
        <View style={[styles.statCard, styles.totalCard]}>
          <Text style={[styles.statNumber, styles.totalNumber]}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, styles.pendingCard]}>
          <Text style={[styles.statNumber, styles.pendingNumber]}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, styles.completedCard]}>
          <Text style={[styles.statNumber, styles.completedNumber]}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
        {stats.overdue > 0 && (
          <View style={[styles.statCard, styles.overdueCard]}>
            <Text style={[styles.statNumber, styles.overdueNumber]}>{stats.overdue}</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>
        )}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.filterButton, showFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons 
            name="filter" 
            size={16} 
            color={showFilters ? '#FFFFFF' : '#3B82F6'} 
          />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filterPanel}>
          <Text style={styles.filterTitle}>Filter Tasks</Text>

          <View style={styles.statusFilters}>
            <TouchableOpacity
              style={[
                styles.statusFilter,
                filters.completed === false && styles.statusFilterActive
              ]}
              onPress={() => setFilters(prev => ({
                ...prev,
                completed: filters.completed === false ? undefined : false
              }))}
            >
              <Text style={[
                styles.statusFilterText,
                filters.completed === false && styles.statusFilterTextActive
              ]}>
                Active
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.statusFilter,
                filters.completed === true && styles.statusFilterActive
              ]}
              onPress={() => setFilters(prev => ({
                ...prev,
                completed: filters.completed === true ? undefined : true
              }))}
            >
              <Text style={[
                styles.statusFilterText,
                filters.completed === true && styles.statusFilterTextActive
              ]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.filterSectionTitle}>Categories</Text>
          <View style={styles.filterChipsContainer}>
            {TODO_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  filters.category === category ? styles.filterChipActive : null
                ]}
                onPress={() => setFilters(prev => ({
                  ...prev,
                  category: filters.category === category ? undefined : category
                }))}
              >
                <Text style={[
                  styles.filterChipText,
                  filters.category === category ? { color: AppColors.text.inverse } : null
                ]}>
                  {CATEGORY_LABELS[category]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterSectionTitle}>Priority</Text>
          <View style={styles.filterChipsContainer}>
            {TODO_PRIORITIES.map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.filterChip,
                  filters.priority === priority ? styles.filterChipActive : null
                ]}
                onPress={() => setFilters(prev => ({
                  ...prev,
                  priority: filters.priority === priority ? undefined : priority
                }))}
              >
                <Text style={[
                  styles.filterChipText,
                  filters.priority === priority ? { color: AppColors.text.inverse } : null
                ]}>
                  {PRIORITY_LABELS[priority]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearFiltersText}>Clear All Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredTodos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  statsHeader: {
    flexDirection: 'row',
    backgroundColor: AppColors.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border.light,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
  },
  totalCard: {
    backgroundColor: 'black',
  },
  pendingCard: {
    backgroundColor: 'black',
  },
  completedCard: {
    backgroundColor: 'black',
  },
  overdueCard: {
    backgroundColor: 'black',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalNumber: {
    color: '#3B82F6',
  },
  pendingNumber: {
    color: '#F97316',
  },
  completedNumber: {
    color: '#10B981',
  },
  overdueNumber: {
    color: '#EF4444',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: AppColors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 3,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  filterButton: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: AppColors.background.tertiary,
  },
  filterButtonActive: {
    backgroundColor: AppColors.primary.main,
  },
  filterPanel: {
    backgroundColor: AppColors.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: AppColors.border.light,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 16,
  },
  statusFilters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statusFilter: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#E8E8E9',
  },
  statusFilterActive: {
    backgroundColor: '#3B82F6',
  },
  statusFilterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  statusFilterTextActive: {
    color: '#FFFFFF',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 8,
    marginTop: 8,
  },
  filterChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#E8E8E9',
    borderWidth: 1,
    borderColor: AppColors.border.medium,
  },
  filterChipActive: {
    backgroundColor: AppColors.primary.main,
    borderColor: AppColors.primary.main,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  clearFiltersButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});