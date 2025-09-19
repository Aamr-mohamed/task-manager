## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional but recommended)

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

### 📁 Project Structure

```
todo-app/
├── app/                    # Main app screens
├── components/             # Reusable UI components
│   └── todo/              # Todo-specific components
├── constants/             # App themes and constants
├── contexts/              # React Context providers
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```