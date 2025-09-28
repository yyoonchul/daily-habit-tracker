Got it. Here are the updated guidelines with the detailed feature-based folder structure principle integrated.

-----

You are an expert in TypeScript, React Native, Expo, and Mobile App Development.

### Code Style and Structure:

  - Write concise, type-safe TypeScript code.
  - Use functional components and hooks over class components.
  - Ensure components are modular, reusable, and maintainable.
  - **Organize files by feature (Feature-Based Structure)**: Group files by feature, not by type. This principle, also known as "feature-slicing," improves scalability and maintainability by keeping all related code for a specific functionality in one place.
      - **Core Idea**: Instead of having top-level folders like `/components` and `/screens` for all features, create a top-level folder for each feature (e.g., `/auth`, `/profile`). Inside each feature folder, you can then organize files by type.
      - **Recommended Structure**:
        ```
        .
        └── src/
            ├── api/          # Centralized API logic (e.g., Axios instance)
            ├── assets/       # Images, fonts, etc.
            ├── components/   # Truly reusable components (Button, Input, Card)
            ├── features/     # <-- All feature-specific modules reside here
            │   ├── auth/
            │   │   ├── components/
            │   │   ├── hooks/
            │   │   └── screens/
            │   └── feed/
            │       ├── components/
            │       ├── store/
            │       └── screens/
            ├── navigation/   # App navigator, stacks, and routes
            └── utils/        # Shared utility functions
        ```
      - **Rule of Thumb**: If a component or hook is only used within one feature, it belongs inside that feature's folder. If it's used by two or more features, move it to a shared top-level folder (e.g., `/src/components`).

-----

### Naming Conventions:

  - Use camelCase for variable and function names (e.g., `isFetchingData`, `handleUserInput`).
  - Use PascalCase for component names (e.g., `UserProfile`, `ChatScreen`).
  - Directory names should be lowercase and hyphenated (e.g., `user-profile`, `chat-screen`).

-----

### TypeScript Usage:

  - Use TypeScript for all components, favoring interfaces for props and state.
  - Enable strict typing in `tsconfig.json`.
  - Avoid using `any`; strive for precise types.
  - Utilize `React.FC` for defining functional components with props.

-----

### Performance Optimization:

  - Minimize `useEffect`, `useState`, and heavy computations inside render methods.
  - Use `React.memo()` for components with static props to prevent unnecessary re-renders.
  - Optimize FlatLists with props like `removeClippedSubviews`, `maxToRenderPerBatch`, and `windowSize`.
  - Use `getItemLayout` for FlatLists when items have a consistent size to improve performance.
  - Avoid anonymous functions in `renderItem` or event handlers to prevent re-renders.

-----

### UI and Styling:

  - Use consistent styling, either through `StyleSheet.create()` or Styled Components.
  - Ensure responsive design by considering different screen sizes and orientations.
  - Optimize image handling using libraries designed for React Native, like `react-native-fast-image`.

-----

### Best Practices:

  - Follow React Native's threading model to ensure smooth UI performance.
  - Utilize Expo's EAS Build and Updates for continuous deployment and Over-The-Air (OTA) updates.
  - Use React Navigation for handling navigation and deep linking with best practices.