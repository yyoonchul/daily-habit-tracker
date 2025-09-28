# Project Refactoring Guide

## Overview
This project has been refactored to follow a **feature-based folder structure** as recommended in the React Native best practices. This approach improves scalability, maintainability, and code organization.

## New Folder Structure

```
src/
├── components/           # Shared, reusable components
│   └── ui/              # UI components (LiquidGlass components)
├── features/            # Feature-specific modules
│   ├── routine/         # Routine management feature
│   │   ├── components/  # Routine-specific components
│   │   ├── screens/     # Routine screens
│   │   ├── hooks/       # Routine-specific hooks
│   │   └── types/       # Routine-specific types
│   ├── analytics/       # Analytics feature
│   │   ├── components/  # Analytics-specific components
│   │   ├── screens/     # Analytics screens
│   │   └── hooks/       # Analytics-specific hooks
│   └── settings/        # Settings feature
│       ├── components/  # Settings-specific components
│       ├── screens/     # Settings screens
│       └── hooks/       # Settings-specific hooks
├── navigation/          # App navigation configuration
├── contexts/            # React contexts (shared state)
├── hooks/               # Shared custom hooks
├── types/               # Shared TypeScript types
├── styles/              # Shared styles and themes
├── constants/           # App constants
├── utils/               # Utility functions
└── assets/              # Images, fonts, etc.
```

## Key Changes Made

### 1. **Feature-Based Organization**
- **Before**: Files organized by type (`/components`, `/screens`)
- **After**: Files organized by feature (`/features/routine`, `/features/analytics`)

### 2. **Shared Components**
- Moved truly reusable components to `/src/components`
- Liquid Glass components are now in `/src/components/ui`

### 3. **Feature Modules**
Each feature now contains:
- `components/` - Feature-specific components
- `screens/` - Feature screens
- `hooks/` - Feature-specific hooks
- `types/` - Feature-specific types

### 4. **Navigation**
- Created centralized navigation in `/src/navigation/AppNavigator.tsx`
- Uses React Navigation instead of Expo Router for better control

### 5. **Entry Point**
- Changed from `expo-router/entry` to `App.tsx`
- Proper context providers setup

## Migration Benefits

### ✅ **Improved Scalability**
- Easy to add new features without affecting existing code
- Clear separation of concerns

### ✅ **Better Maintainability**
- Related code is grouped together
- Easier to find and modify feature-specific code

### ✅ **Enhanced Developer Experience**
- Clear project structure
- Reduced cognitive load
- Easier onboarding for new developers

### ✅ **Performance Benefits**
- Better code splitting opportunities
- Reduced bundle size through feature isolation

## Import Path Updates

### Before:
```typescript
import { useRoutines } from '@/contexts/RoutineContext';
import { LiquidGlassButton } from '@/components/ui';
```

### After:
```typescript
import { useRoutines } from '../../../contexts/RoutineContext';
import { LiquidGlassButton } from '../../../components/ui';
```

## File Locations

| Component | Old Location | New Location |
|-----------|-------------|--------------|
| Routine Screen | `app/(tabs)/index.tsx` | `src/features/routine/screens/RoutineScreen.tsx` |
| Analytics Screen | `app/(tabs)/analytics.tsx` | `src/features/analytics/screens/AnalyticsScreen.tsx` |
| Settings Screen | `app/(tabs)/settings.tsx` | `src/features/settings/screens/SettingsScreen.tsx` |
| Liquid Glass Components | `components/ui/` | `src/components/ui/` |
| Contexts | `contexts/` | `src/contexts/` |
| Navigation | `app/_layout.tsx` | `src/navigation/AppNavigator.tsx` |

## Development Guidelines

### 1. **Adding New Features**
1. Create a new folder in `/src/features/[feature-name]/`
2. Add `components/`, `screens/`, `hooks/`, `types/` subfolders
3. Implement feature-specific code
4. Update navigation if needed

### 2. **Shared Components**
- Only move components to `/src/components` if used by 2+ features
- Keep feature-specific components in their respective feature folders

### 3. **Import Paths**
- Use relative imports within features
- Use absolute imports for shared utilities
- Consider creating path aliases in `tsconfig.json` for cleaner imports

## Testing the Refactored Structure

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Verify all screens load correctly:**
   - Routine screen with liquid glass effects
   - Analytics screen with charts
   - Settings screen with theme options

3. **Check for any import errors:**
   - All components should load without errors
   - Navigation should work smoothly
   - Liquid glass effects should render properly

## Next Steps

1. **Add Path Aliases** (Optional)
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"],
         "@/components/*": ["src/components/*"],
         "@/features/*": ["src/features/*"]
       }
     }
   }
   ```

2. **Create Feature-Specific Hooks**
   - Move routine logic to `src/features/routine/hooks/`
   - Create analytics-specific hooks
   - Add settings-specific hooks

3. **Add Feature-Specific Types**
   - Move routine types to `src/features/routine/types/`
   - Create analytics types
   - Add settings types

This refactoring provides a solid foundation for future development and follows React Native best practices for scalable applications.
