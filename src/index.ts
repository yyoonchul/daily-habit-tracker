// Main entry point for the refactored app
export { default as App } from '../App';

// Export contexts
export { RoutineProvider } from './contexts/RoutineContext';
export { ThemeProvider } from './contexts/ThemeContext';

// Export navigation
export { default as AppNavigator } from './navigation/AppNavigator';

// Export shared components
export * from './components/ui';

// Export utilities
export * from './utils';
