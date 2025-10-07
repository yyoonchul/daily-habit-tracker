# Daily Habit Tracker - Product Requirements Document (PRD)

## 1. Product Overview

### 1.1 Product Name
**Daily Habit Tracker** - An iOS-style routine management and tracking application

### 1.2 Product Vision
An intuitive and beautiful mobile application that helps users systematically manage daily routines and maintain consistent execution

### 1.3 Core Value Proposition
- **iOS-native design**: Intuitive UX based on Apple's design system
- **Simple routine management**: One-tap toggle for routine completion
- **Visual feedback**: Dashboard visualizing progress, streaks, and completion rate
- **Personalization**: Preferred theme colors and light/dark mode support

## 2. Target Users

### 2.1 Primary Users
- **Habit builders**: Users who want to create new routines and execute them consistently
- **Productivity-oriented users**: Users aiming to increase productivity through structured daily management
- **iOS users**: Users familiar with the Apple ecosystem who prefer a consistent design experience

### 2.2 User Persona
**"Habit Master" Minsoo Kim (28, office worker)**
- Wants to consistently perform daily routines like morning exercise, reading, and meditation
- Comfortable using smartphone productivity tools
- Values visual feedback and progress tracking
- Prefers a simple and intuitive interface

## 3. Key Feature Requirements

### 3.1 Routine Management

#### 3.1.1 Create and Edit Routines
- **Add routine**: Set title, time, frequency (daily/weekdays/weekends/once a week/n times per week/once a month, etc.)
- **Edit routine**: Modify title, time, and frequency of existing routines
- **Delete routine**: Remove unnecessary routines
- **Time setting**: Specific time or "Anytime" option

#### 3.1.2 Routine Execution and Tracking
- **One-tap toggle**: Easily switch between completed/incomplete states
- **Visual feedback**: Completed routines show a check and strikethrough
- **Progress indicator**: Progress bar visually showing today's completion rate

### 3.2 Dashboard and Analytics

#### 3.2.1 Home Screen
- **Today's progress**: Completed routines / total routines
- **Routine list**: Routine cards sorted by time
- **Quick actions**: Add routine, edit mode button

#### 3.2.2 Analytics Screen (4 sections)
1. **Overview**: Dashboard with numeric indicators like overall completion rate, average streak, total routines
2. **Trends**: Graph of completion rate over time (1 month/3 months/1 year/all), y-axis = completion rate, x-axis = time
3. **Activity**: Monthly activity heatmap (GitHub-style)
4. **Routines**: Detailed statistics and calendar view per routine

### 3.3 Personalization

#### 3.3.1 Theme Settings
- **Color selection**: 6 preset colors (blue, purple, green, orange, pink, red)
- **Light/Dark mode**: System-linked, light, dark modes
- **Real-time application**: Immediate UI reflection upon changes

#### 3.3.2 User Experience
- **iOS-style design**: Glassmorphism, smooth animations
- **Responsive layout**: Mobile-optimized interface
- **Intuitive navigation**: Bottom tab navigation

## 4. Technical Requirements

### 4.1 Frontend Tech Stack
- **React Native 0.81 + Expo**: Base for iOS app development
- **TypeScript**: Ensures type safety
- **Expo Router**: Navigation
- **AsyncStorage**: Local data persistence
- **@callstack/liquid-glass**: iOS 26 Liquid Glass UI effects
- **react-native-reanimated / gesture-handler / screens / safe-area-context**: Gestures/animations/screen management
- **Expo SDK** (e.g., `expo-haptics`, `expo-image`, `expo-linear-gradient`, `expo-symbols`): Platform features and UI enhancements

### 4.2 State Management
- **Local state**: React useState/useContext
- **Persistence**: Local storage via AsyncStorage
- **State structure**:
  ```typescript
  interface Routine {
    id: string;
    title: string;
    description?: string;
    scheduledTime: string;
    frequency: string;
    completed: boolean;
    streak: number;
    monthlySuccessRate: number;
  }
  ```

### 4.3 Design System
- **Color palette**: HSL-based color system
- **Typography**: iOS-style text hierarchy
- **Spacing**: 4px grid system
- **Animations**: CSS transitions and keyframes
- **Shadows**: Layered shadow system

## 5. User Experience (UX) Requirements

### 5.1 Navigation Structure
```
Home (/)
├── Routine list and progress
├── Add routine functionality
└── Quick edit button

Analytics (/analytics)
├── Overview section
├── Trends section
├── Activity section
└── Routines section

Management (/management)
├── Routine list
├── Edit/delete routines
└── Add new routine

Settings (/settings)
├── Theme color selection
├── Dark/light mode
└── App information
```

### 5.2 Interaction Patterns
- **Tap gesture**: Toggle routine completion/incompletion
- **Swipe**: Move between analytics sections
- **Modal**: Add/edit routine form
- **Tooltip**: Show detailed information

### 5.3 Feedback System
- **Visual feedback**: Animations, color changes
- **Toast notifications**: Completion notifications
- **Progress indicator**: Progress bar and percentage
- **Status indicator**: Complete/incomplete icons

## 6. Performance Requirements

### 6.1 Loading Performance
- **Initial load**: Within 3 seconds
- **Page transition**: Within 500ms
- **Animations**: Maintain 60fps

### 6.2 Responsiveness
- **Touch response**: Within 100ms
- **State updates**: Immediate reflection
- **Data synchronization**: Real-time

### 6.3 Optimization
- **Code splitting**: Page-based bundle separation
- **Image optimization**: Use WebP format
- **Caching**: Utilize localStorage

## 7. Accessibility Requirements

### 7.1 Visual Accessibility
- **Color contrast**: WCAG AA compliant
- **Text size**: Minimum 14px
- **Icons**: Convey clear meaning

### 7.2 Usability
- **Touch targets**: Minimum 44px
- **Gestures**: Intuitive swipe/tap
- **Keyboard**: Accessibility keyboard support

## 8. Data Requirements

### 8.1 Data Structure
```typescript
// Schema assuming local storage in a mobile app (AsyncStorage)

// Routine entity (includes today's status)
export interface Routine {
  id: string;                               // Unique ID (uuid)
  title: string;                            // Routine name
  description?: string;                     // Description (optional)
  scheduledTime?: string | null;            // HH:mm or null ("Anytime")
  frequency: 'daily' | 'weekdays' | 'weekends' | 'weekly' | 'custom';
  completedToday: boolean;                  // Whether completed today (for quick daily toggle lookup)
  streak: number;                           // Consecutive achievement days
  monthlySuccessRate: number;               // Monthly success rate (0–100)
  createdAt: string;                        // ISO8601
  updatedAt: string;                        // ISO8601
  lastCompletedAt?: string;                 // Last completion time (ISO8601)
}

// Routine history (for calendar/trend calculations)
export interface RoutineHistoryRecord {
  date: string;                             // ISO8601 (yyyy-MM-dd)
  completed: boolean;                       // Completion status on that date
}

// User settings
export interface UserSettings {
  primaryColor: string;                     // Theme color (HSL or HEX)
  theme: 'light' | 'dark' | 'system';       // Display mode
}

// App-wide state (serialized and stored under a single key)
export interface AppState {
  version: number;                          // Schema version (for migrations)
  routines: Routine[];                      // Routine list
  routineHistoryById: Record<string, RoutineHistoryRecord[]>; // History per routine
  settings: UserSettings;                   // User settings
  lastBackupAt?: string;                    // Last backup time (optional)
}

// AsyncStorage keys
export type StorageKey = 'APP_STATE';
export const APP_STATE_KEY: StorageKey = 'APP_STATE';
```

### 8.2 Data Persistence
- **Local storage**: Serialize as JSON under a single `APP_STATE` key in AsyncStorage
- **Save policy**: Commit via debounced writes on critical changes (add/edit/toggle routine, settings change)
- **Backup (future)**: Provide iCloud/file export (JSON) option
- **Migration**: Apply sequential migration functions based on `AppState.version`

## 9. Security and Privacy

### 9.1 Data Security
- **Local storage**: All data stored only on the user's device
- **Encryption**: Encrypt sensitive data (future)
- **Permissions**: Request minimum necessary permissions

### 9.2 Personal Information
- **Data collection**: Only routine information is collected
- **External transfer**: No current data transmission to external servers
- **Consent**: Processing based on explicit user consent

## 10. Future Expansion Plans

### 10.1 Short-term (v1.1)
- **Notifications**: Push notifications timed to routine schedules
- **Widget support**: Home screen widgets
- **Data export**: Export in CSV/JSON formats

### 10.2 Mid-term (v2.0)
- **Cloud sync**: Data synchronization across multiple devices
- **Social features**: Share routines with friends
- **AI recommendations**: Personalized routine suggestions

### 10.3 Long-term (v3.0)
- **Wearable integration**: Apple Watch support
- **Health app integration**: Integration with health data
- **Community**: Routine-sharing community

## 11. Success Metrics (KPI)

### 11.1 User Engagement
- **Daily Active Users (DAU)**: 80% or higher
- **Routine completion rate**: 70% average or higher
- **Session duration**: 3 minutes average or more

### 11.2 User Satisfaction
- **App Store rating**: 4.5 or higher
- **User feedback**: 80% or more positive
- **Return rate**: 60% or more return within 7 days

### 11.3 Feature Usage
- **Add routine**: 90%+ of new users add a routine in the first week
- **Analytics usage**: 50%+ weekly usage
- **Settings changes**: 30%+ use personalization features

## 12. Development Roadmap

### 12.1 Phase 1: Core Features (4 weeks)
- [x] Basic routine CRUD features
- [x] Home screen dashboard
- [x] Basic analytics screen
- [x] Theme settings

### 12.2 Phase 2: Enhancements (2 weeks)
- [ ] Animation optimizations
- [ ] Performance tuning
- [ ] Accessibility improvements
- [ ] User testing

### 12.3 Phase 3: Launch Preparation (1 week)
- [ ] Final testing
- [ ] Documentation
- [ ] Deployment preparation
- [ ] Marketing materials

---

This PRD provides a comprehensive summary of the current implementation of the Apple Routine Flow app, including key features, technical requirements, user experience, and future development directions.
