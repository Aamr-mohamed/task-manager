# Todo App - Google Tasks Dark Mode

A modern, feature-rich todo application built with React Native and Expo, featuring a clean Google Tasks-inspired dark mode interface with comprehensive task management capabilities.

## App Overview

This todo application provides a comprehensive task management solution with a focus on usability and clean design. The app features a dark mode interface inspired by Google Tasks, offering users an intuitive way to organize, track, and complete their daily tasks and projects.

### Core Features

**Task Management**
- Create new tasks with titles, descriptions, due dates, categories, and priority levels
- Edit existing tasks inline without losing context
- Delete tasks with confirmation prompts to prevent accidental removal
- Mark tasks as complete/incomplete with visual feedback

**Organization System**
- Category-based organization (Work, Personal, Shopping, Health, Fitness, Education, Other)
- Priority levels (Low, Medium, High, Critical) for task importance
- Due date tracking with overdue indicators
- Real-time task statistics showing total, pending, completed, and overdue counts

**Advanced Filtering and Search**
- Global search functionality across task titles and descriptions
- Filter by completion status (All, Pending, Completed)
- Category-specific filtering
- Priority-based filtering
- Clear all filters option for quick reset

**User Interface**
- Google Tasks-inspired dark mode design with high contrast
- Responsive layout that works on phones, tablets, and web browsers
- Smooth animations and transitions for better user experience
- Clean, distraction-free interface focused on productivity

## Usage Instructions

### Creating Tasks
1. Tap the "+" button in the header to open the task creation form
2. Enter a task title (required) and optional description
3. Select a priority level and category from the available options
4. Optionally set a due date using the date picker
5. Tap "Create Task" to save the new task

### Managing Tasks
- **Complete/Uncomplete**: Tap the radio button next to any task
- **Edit**: Tap the edit (pencil) icon on any task to modify its details
- **Delete**: Tap the delete (trash) icon and confirm the deletion

### Filtering and Search
- Use the search bar at the top to find specific tasks by title or description
- Tap the filter icon to access filtering options
- Select status filters (All, Pending, Completed) for quick views
- Choose category or priority filters to focus on specific task types
- Use "Clear Filters" to remove all active filters

### Statistics
The stats header shows real-time counts of:
- Total tasks in your list
- Pending (incomplete) tasks
- Completed tasks
- Overdue tasks (past their due date)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (optional but recommended)

### Getting Started

1. **Clone or download the project**
   ```bash
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run the app**
   - **Web**: Press `w` in the terminal or visit `http://localhost:8081`
   - **Mobile (Expo Go)**: Scan the QR code with the Expo Go app
   - **Android Emulator**: Press `a` in the terminal
   - **iOS Simulator**: Press `i` in the terminal (macOS only)

## Third-Party Libraries

### Core Framework
- **expo** (~54.0.7): Cross-platform development framework for React Native applications
- **react** (19.1.0): JavaScript library for building user interfaces
- **react-native** (0.81.4): Framework for building native mobile apps using React
- **react-dom** (19.1.0): React package for working with the DOM (web support)
- **react-native-web** (~0.21.0): Enables React Native components to run on the web

### Navigation and Routing
- **expo-router** (~6.0.4): File-based routing system for Expo and React Native apps
- **@react-navigation/native** (^7.1.8): Core navigation library for React Native
- **@react-navigation/bottom-tabs** (^7.4.0): Tab navigator component
- **@react-navigation/elements** (^2.6.3): Shared navigation elements and components

### User Interface
- **@expo/vector-icons** (^15.0.2): Icon library providing access to popular icon sets (Ionicons used)
- **react-native-safe-area-context** (~5.6.0): Provides safe area inset information for proper layout
- **expo-status-bar** (~3.0.8): Controls the appearance of the system status bar

### Screen and Gesture Handling
- **react-native-screens** (~4.16.0): Optimized screen container components for better performance
- **react-native-gesture-handler** (~2.28.0): Declarative API for gesture recognition
- **react-native-worklets** (0.5.1): JavaScript worklets for high-performance operations

### Expo-Specific Modules
- **expo-constants** (~18.0.8): Provides system information and app configuration
- **expo-font** (~14.0.8): Allows loading custom fonts
- **expo-haptics** (~15.0.7): Provides haptic feedback functionality
- **expo-image** (~3.0.8): Optimized image component for better performance
- **expo-linking** (~8.0.8): Handles URL schemes and deep linking
- **expo-splash-screen** (~31.0.10): Controls the native splash screen
- **expo-symbols** (~1.0.7): Provides access to SF Symbols on iOS
- **expo-system-ui** (~6.0.7): Controls system UI appearance
- **expo-web-browser** (~15.0.7): Opens web browsers from within the app

### Development Tools
- **typescript** (~5.9.2): Adds static type checking to JavaScript
- **@types/react** (~19.1.0): Type definitions for React
- **@types/react-native** (^0.72.8): Type definitions for React Native
- **eslint** (^9.25.0): JavaScript linting utility for code quality
- **eslint-config-expo** (~10.0.0): ESLint configuration for Expo projects

## Project Structure

```
todo-app/
├── app/                    # Main app screens and layouts
│   ├── (tabs)/            # Tab-based navigation screens
│   └── _layout.tsx        # Root layout component
├── components/            # Reusable UI components
│   └── todo/             # Todo-specific components
├── constants/            # App themes and configuration
├── contexts/             # React Context providers for state management
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and helpers
```

## Technical Architecture

The application uses a component-based architecture with the following patterns:
- **State Management**: React Context with useReducer for centralized todo state
- **Type Safety**: Full TypeScript implementation with strict typing
- **Component Composition**: Modular, reusable components for maintainability
- **File-based Routing**: Expo Router for intuitive navigation structure
- **Theme System**: Centralized color and styling constants for consistent design

## License

This project is open source and available under the MIT License.