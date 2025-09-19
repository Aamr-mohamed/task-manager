# Todo App - Google Tasks Dark Mode

A modern, feature-rich todo application built with React Native and Expo, featuring a clean interface with comprehensive task management capabilities.

## App Overview

This todo application provides a comprehensive task management solution with a focus on usability and clean design.

## Usage Instructions

### Creating Tasks
1. Tap the "+" button in the header to open the task creation form
2. Enter a task title (required) and optional description
3. Select a priority level and category from the available options
4. Optionally set a due date using the date picker
5. Tap "Create Task" to save the new task

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