# Apple Routine Flow

An intuitive and beautiful mobile application that helps users systematically manage their daily routines and maintain consistent execution.

## Features

- **Routine Management**: Create, edit, and track daily routines
- **Progress Tracking**: Visual progress indicators and completion rates
- **Analytics**: Comprehensive analytics with trends and activity heatmaps
- **Customization**: Theme colors and appearance settings
- **iOS-style Design**: Beautiful glassmorphism UI with smooth animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Navigate to the project directory:
   ```bash
   cd DailyHabitTracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - **iOS**: `npm run ios`
   - **Android**: `npm run android`
   - **Web**: `npm run web`

## Project Structure

```
DailyHabitTracker/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── analytics.tsx  # Analytics screen
│   │   └── settings.tsx   # Settings screen
│   └── _layout.tsx         # Root layout
├── contexts/              # React contexts
│   ├── ThemeContext.tsx   # Theme management
│   └── RoutineContext.tsx # Routine data management
├── types/                 # TypeScript type definitions
│   └── index.ts          # Main types
└── components/           # Reusable components
```

## Key Features

### Home Screen
- Today's progress overview
- Routine list with completion status
- Add new routines
- Visual progress indicators

### Analytics Screen
- Overview statistics
- Completion trends
- Activity heatmap
- Individual routine analytics

### Settings Screen
- Theme color customization
- Appearance settings (Light/Dark/System)
- App information

## Technology Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation
- **AsyncStorage** for data persistence
- **Linear Gradient** for beautiful UI
- **Ionicons** for consistent iconography

## Data Management

The app uses React Context for state management:
- `ThemeContext`: Manages theme colors and appearance
- `RoutineContext`: Manages routine data and operations

Data is persisted using AsyncStorage for offline functionality.

## Development

### Running the App

1. Start the Metro bundler:
   ```bash
   npm start
   ```

2. Open the app on your device/simulator:
   - Scan the QR code with Expo Go app (mobile)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

### Building for Production

1. **iOS**:
   ```bash
   expo build:ios
   ```

2. **Android**:
   ```bash
   expo build:android
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.