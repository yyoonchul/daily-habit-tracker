# Apple Routine Flow (iOS, React Native)

A React Native-based iOS application that helps users systematically manage and consistently execute their daily routines. The iOS 26 Liquid Glass style is implemented using the `@callstack/liquid-glass` library.

## Key Features

- **Routine Management**: Create, edit, and track daily routines
- **Progress Tracking**: Visual progress indicators and completion rate
- **Analytics**: Comprehensive analytics including trends and an activity heatmap
- **Customization**: Theme color and display mode settings
- **iOS-style Design**: Sleek glassmorphism UI with smooth animations

## iOS Dev Stack Overview

- React Native 0.81 + Expo
- TypeScript
- Build and run native modules via EAS/Dev Client
- UI effects: `@callstack/liquid-glass` (iOS 26 Liquid Glass)

## Getting Started (iOS)

### Prerequisites

- Node.js (v18+)
- Expo CLI
- Xcode 26+ (with iOS Simulator)

### Installation

1. Move to the project directory:
   ```bash
   cd DailyHabitTracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install the Liquid Glass library:
   ```bash
   npm install @callstack/liquid-glass
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Run the iOS app (native modules build recommended):
   - Create a Dev Client (first time or when native changes are made)
     ```bash
     # If a bare prebuild is needed
     expo prebuild -p ios
     # Build and install the Dev Client
     expo run:ios --device
     ```
   - Alternative with EAS Dev Build
     ```bash
     eas build --profile development --platform ios
     ```

## Project Structure

```
DailyHabitTracker/
└── src/
    ├── api/                 # Shared API client/instances
    ├── assets/              # Static assets like images and fonts
    ├── components/          # Truly shared components reused across features
    ├── features/            # Feature (domain) level code
    │   ├── routine/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── screens/
    │   ├── analytics/
    │   │   ├── components/
    │   │   └── screens/
    │   └── settings/
    │       ├── components/
    │       └── screens/
    ├── navigation/          # App navigation (tabs/stack/routes)
    ├── contexts/            # Global contexts (only truly global state)
    ├── utils/               # Shared utilities
    └── types/               # Global type definitions
```

## Core Screens

### Home Screen
- Overview of today's progress
- Routine list with completion state
- Add new routine
- Visual progress indicators

### Analytics Screen
- Overview stats
- Completion rate trends
- Activity heatmap
- Per-routine analytics

### Settings Screen
- Theme color customization
- Display mode (Light/Dark/System)
- App information

## Tech Stack

- **React Native** with Expo (iOS-focused)
- **TypeScript** for type safety
- **Expo Router** for navigation
- **AsyncStorage** for data persistence
- UI effects: **@callstack/liquid-glass** (iOS 26)
- **Linear Gradient** for beautiful UI, **Ionicons** for consistent icons

## Using Liquid Glass (iOS 26)

Liquid Glass visual effects are applied only on iOS 26+. On unsupported devices, it renders like a normal View without effects.

1) Installation
```bash
npm install @callstack/liquid-glass
```

2) Basic usage example
```tsx
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported,
} from '@callstack/liquid-glass';

export function GlassCard() {
  return (
    <LiquidGlassView
      style={[
        { padding: 16, borderRadius: 16 },
        !isLiquidGlassSupported && { backgroundColor: 'rgba(255,255,255,0.1)' },
      ]}
      effect="regular"
      interactive
    >
      <Text>Hello World</Text>
    </LiquidGlassView>
  );
}

// Merge multiple glass elements
export function MergedGlass() {
  return (
    <LiquidGlassContainerView spacing={20}>
      <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
      <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
    </LiquidGlassContainerView>
  );
}
```

3) Automatic text color adaptation (PlatformColor)
```tsx
import { PlatformColor, Text } from 'react-native';
import { LiquidGlassView } from '@callstack/liquid-glass';

export function AdaptiveText() {
  return (
    <LiquidGlassView style={{ padding: 20, borderRadius: 20 }}>
      <Text style={{ color: PlatformColor('labelColor') }}>Hello World</Text>
    </LiquidGlassView>
  );
}
```

Notes
- Requires Xcode 26+, React Native 0.80+
- Use Dev Client/EAS Dev Build to validate native visual effects on-device

## Data Management

The app uses React Context for state management:
- `ThemeContext`: Manages theme colors and display modes
- `RoutineContext`: Manages routine data and actions

Data is stored in AsyncStorage for offline use.

## Development

### Run the app

1. Start Metro bundler:
   ```bash
   npm start
   ```

2. Open on iOS:
   - Install a Dev Client and connect to Metro (recommended)
   - Or install/run directly via `expo run:ios --device`

### Production build

1. **iOS**:
   - EAS Build recommended
   ```bash
   eas build --platform ios --profile production
   ```

2. **Android** (optional):
   ```bash
   eas build --platform android --profile production
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Apply changes
4. Test thoroughly
5. Submit a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and inquiries, please open an issue in the repository.