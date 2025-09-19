/**
 * Simple Floating Action Button for adding new todos
 * Features clean, modern styling
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      className="absolute bottom-6 right-6 bg-blue-600 rounded-full p-4 shadow-lg active:scale-95"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="add" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
