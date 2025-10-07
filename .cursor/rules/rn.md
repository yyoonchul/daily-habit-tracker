You are an expert in TypeScript, React Native, Expo, and mobile app development.

### Code Style and Structure:

  - Write concise, type-safe TypeScript code.
  - Prefer function components and hooks over class components.
  - Components should be modular, reusable, and maintainable.
  - **Organize files by feature (Feature-Based Structure)**: group files by feature rather than by type. This principle (aka "feature-slicing") keeps related code in one place to improve scalability and maintainability.
      - **Core idea**: Instead of dumping everything under top-level folders like `/components` or `/screens`, create a top-level folder per feature (e.g., `/auth`, `/profile`). Inside each feature folder, you may organize by type as needed.
      - **Recommended structure**:
        ```
        .
        └── src/
            ├── api/          # Centralized API logic (e.g., Axios instance)
            ├── assets/       # Images, fonts, etc.
            ├── components/   # Truly reusable components (Button, Input, Card)
            ├── features/     # <-- Feature-specific modules live here
            │   ├── auth/
            │   │   ├── components/
            │   │   ├── hooks/
            │   │   └── screens/
            │   └── feed/
            │       ├── components/
            │       ├── store/
            │       └── screens/
            ├── navigation/   # App navigator, stacks, routes
            └── utils/        # Shared utility functions
        ```
      - **Rule of thumb**: If a component/hook is used only within a specific feature, keep it inside that feature folder. If it’s used by two or more features, promote it to a shared folder (e.g., `/src/components`).

-----

### Naming Conventions:

  - Use camelCase for variables/functions (e.g., `isFetchingData`, `handleUserInput`).
  - Use PascalCase for component names (e.g., `UserProfile`, `ChatScreen`).
  - Use lowercase-with-hyphens for directory names (e.g., `user-profile`, `chat-screen`).

-----

### TypeScript Usage:

  - Use TypeScript across all components; prefer interfaces for props/state.
  - Enable strict typing in `tsconfig.json`.
  - Avoid `any`; aim for precise, specific types.
  - Define function components with props as `React.FC`.

-----

### Performance Optimization:

  - Minimize heavy work in render; be mindful with `useEffect`/`useState`.
  - Use `React.memo()` for components with static props to avoid unnecessary re-renders.
  - Optimize FlatList via `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize`, etc.
  - Use `getItemLayout` when item heights are uniform.
  - Avoid inline anonymous functions in `renderItem` and handlers to reduce re-renders.

-----

### UI and Styling:

  - Use a consistent styling approach like `StyleSheet.create()` or styled-components.
  - Ensure responsive design across screen sizes and orientations.
  - Optimize images with RN-focused libraries (e.g., `react-native-fast-image`).

-----

### Best Practices:

  - Respect React Native's threading model to keep the UI smooth.
  - Leverage Expo EAS Build/Updates for continuous delivery and OTA updates.
  - Follow React Navigation best practices for navigation and deep linking.