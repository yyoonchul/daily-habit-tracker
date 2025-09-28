# Home Page & Routine Management - Product Requirements Document

## 1. Overview

### 1.1 Purpose
This document outlines the detailed requirements for the Home Page and Routine Management features of Apple Routine Flow, focusing on user experience, functionality, and technical implementation.

### 1.2 Scope
- Home Page (Index.tsx) - Main dashboard and routine display
- Routine Management Page (Management.tsx) - Routine editing and organization
- Related components and user interactions

## 2. Home Page Requirements

### 2.1 Page Structure

#### 2.1.1 Layout Components
```
Home Page Layout:
├── Header Section
│   ├── Edit Button (left)
│   ├── Main Header Component (center)
│   └── Add Button (right)
├── Statistics Section
│   └── RoutineStats Component
├── Routine List Section
│   └── Sorted Routine Cards
└── Bottom Navigation
```

#### 2.1.2 Visual Design
- **Background**: iOS-style gradient background with glassmorphism effect
- **Container**: Max-width 448px (mobile-optimized) with center alignment
- **Spacing**: 16px padding with 32px bottom padding for navigation
- **Cards**: Glassmorphism cards with backdrop-blur-xl and white/10 opacity

### 2.2 Header Section Requirements

#### 2.2.1 Edit Button
- **Position**: Top-left corner
- **Text**: "Edit"
- **Styling**: Ghost button with rounded-full corners
- **Hover State**: iOS blue color with 10% opacity background
- **Functionality**: Navigate to Management page

#### 2.2.2 Main Header
- **Component**: MainHeader component
- **Purpose**: App branding and title display
- **Position**: Center of header section

#### 2.2.3 Add Button
- **Position**: Top-right corner
- **Icon**: Plus icon (Lucide React)
- **Size**: 8x8 (32px) with 5x5 icon
- **Styling**: Ghost button with rounded-full corners
- **Hover State**: iOS blue color with 10% opacity background
- **Functionality**: Open Add Routine Dialog

### 2.3 Statistics Section Requirements

#### 2.3.1 RoutineStats Component
- **Purpose**: Display today's progress and completion rate
- **Layout**: Full-width card with glassmorphism styling
- **Content**:
  - Progress text: "Today's Progress"
  - Completion ratio: "completed/total" format
  - Progress bar: Animated width based on completion percentage
  - Percentage display: Large, prominent percentage

#### 2.3.2 Data Calculation
```typescript
const completedToday = routines.filter(r => r.completed).length;
const totalRoutines = routines.length;
const completionRate = totalRoutines > 0 ? 
  Math.round((completedToday / totalRoutines) * 100) : 0;
```

### 2.4 Routine List Section Requirements

#### 2.4.1 Sorting Logic
- **Primary Sort**: By scheduled time (ascending)
- **Time Parsing**: Convert "HH:MM" format to minutes for comparison
- **Fallback**: "Any time" routines sorted to end
- **Implementation**:
```typescript
const sortedRoutines = [...routines].sort((a, b) => {
  const timeA = a.scheduledTime.split(':').map(Number);
  const timeB = b.scheduledTime.split(':').map(Number);
  const minutesA = timeA[0] * 60 + timeA[1];
  const minutesB = timeB[0] * 60 + timeB[1];
  return minutesA - minutesB;
});
```

#### 2.4.2 Routine Card Display
- **Spacing**: 12px gap between cards
- **Conditional Rendering**: Only show if routines exist
- **Card Component**: RoutineCard with toggle functionality

### 2.5 Add Routine Dialog Requirements

#### 2.5.1 Dialog Structure
- **Trigger**: Add button click
- **State Management**: showAddForm boolean state
- **Styling**: Glassmorphism with backdrop-blur-xl
- **Size**: Max-width 384px (max-w-sm)

#### 2.5.2 Dialog Content
- **Header**: "Add New Routine" title
- **Form**: AddRoutineForm component
- **Actions**: Add and Cancel functionality

#### 2.5.3 Form Validation
- **Required Fields**: Title (trimmed)
- **Optional Fields**: Time, Frequency
- **Default Values**: Frequency = "daily"
- **Time Handling**: Empty time becomes "Any time"

### 2.6 User Interactions

#### 2.6.1 Routine Toggle
- **Action**: Tap on routine card
- **Animation**: Scale animation (0.98) for 300ms
- **State Update**: Toggle completed status
- **Visual Feedback**: Immediate UI update

#### 2.6.2 Navigation
- **Edit Button**: Navigate to /management
- **Add Button**: Open modal dialog
- **Routine Cards**: Toggle completion status

## 3. Routine Management Page Requirements

### 3.1 Page Structure

#### 3.1.1 Layout Components
```
Management Page Layout:
├── Header Section
│   ├── Done Button (left)
│   └── Add Button (right)
├── Title Section
│   ├── "Manage Routines" heading
│   └── Subtitle description
├── Routine List Section
│   └── Editable Routine Cards
└── Bottom Navigation
```

#### 3.1.2 Visual Design
- **Background**: Consistent with home page
- **Container**: Max-width 448px with center alignment
- **Cards**: Glassmorphism with detailed routine information
- **Actions**: Edit and delete buttons for each routine

### 3.2 Header Section Requirements

#### 3.2.1 Done Button
- **Position**: Top-left corner
- **Text**: "Done"
- **Styling**: Ghost button with rounded-full corners
- **Functionality**: Navigate back to home page

#### 3.2.2 Add Button
- **Position**: Top-right corner
- **Icon**: Plus icon (Lucide React)
- **Size**: 8x8 (32px) with 5x5 icon
- **Styling**: Ghost button with rounded-full corners
- **Functionality**: Open Add Routine Dialog

### 3.3 Title Section Requirements

#### 3.3.1 Main Heading
- **Text**: "Manage Routines"
- **Styling**: 2xl font-bold with text-text-primary
- **Position**: Centered

#### 3.3.2 Subtitle
- **Text**: "Edit and organize your routines"
- **Styling**: text-sm with text-text-secondary
- **Position**: Below main heading

### 3.4 Routine List Section Requirements

#### 3.4.1 Routine Card Layout
```
Routine Card Structure:
├── Main Content
│   ├── Routine Title
│   └── Metadata Row
│       ├── Time (with clock icon)
│       ├── Frequency
│       └── Streak
└── Action Buttons
    ├── Edit Button
    └── Delete Button
```

#### 3.4.2 Routine Information Display
- **Title**: Font-medium with text-text-primary
- **Time**: Clock icon with iOS blue color
- **Frequency**: Capitalized text with text-text-secondary
- **Streak**: "X day streak" with text-ios-blue

#### 3.4.3 Action Buttons
- **Edit Button**: 
  - Icon: Edit2 (Lucide React)
  - Size: 4x4 (16px)
  - Color: text-text-secondary
  - Hover: bg-surface-secondary
- **Delete Button**:
  - Icon: Trash2 (Lucide React)
  - Size: 4x4 (16px)
  - Color: text-red-500
  - Hover: bg-surface-secondary

#### 3.4.4 Empty State
- **Condition**: When no routines exist
- **Message**: "No routines yet"
- **Action Button**: "Add Your First Routine"
- **Styling**: Centered with 48px vertical padding

### 3.5 Edit/Add Dialog Requirements

#### 3.5.1 Dialog Structure
- **Trigger**: Edit button or Add button
- **State Management**: editingRoutine and showAddForm states
- **Styling**: Glassmorphism with backdrop-blur-xl
- **Size**: Max-width 384px (max-w-sm)

#### 3.5.2 Form Fields
- **Routine Name**:
  - Type: Text input
  - Label: "Routine Name"
  - Placeholder: "Enter routine name..."
  - Validation: Required, trimmed
- **Time**:
  - Type: Time input
  - Label: "Time"
  - Default: Empty (becomes "Any time")
- **Frequency**:
  - Type: Select dropdown
  - Label: "Frequency"
  - Options: Daily, Weekdays, Weekends, Weekly
  - Default: "daily"

#### 3.5.3 Form Layout
- **Grid**: 2-column grid for Time and Frequency
- **Spacing**: 12px gap between grid items
- **Labels**: text-sm with text-text-secondary
- **Inputs**: border-surface-secondary/50 styling

#### 3.5.4 Form Actions
- **Cancel Button**:
  - Text: "Cancel"
  - Styling: Outline variant
  - Functionality: Close dialog and reset form
- **Save/Add Button**:
  - Text: "Save Changes" or "Add Routine"
  - Styling: iOS blue background
  - Validation: Disabled if title is empty
  - Functionality: Save changes or add new routine

### 3.6 State Management Requirements

#### 3.6.1 Form States
```typescript
const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
const [showAddForm, setShowAddForm] = useState(false);
const [formTitle, setFormTitle] = useState("");
const [formTime, setFormTime] = useState("");
const [formFrequency, setFormFrequency] = useState("daily");
```

#### 3.6.2 State Transitions
- **Edit Mode**: Set editingRoutine, populate form fields
- **Add Mode**: Set showAddForm to true
- **Cancel**: Reset all states and close dialog
- **Save**: Update routine or add new, reset states

### 3.7 User Interactions

#### 3.7.1 Edit Routine
1. Click edit button on routine card
2. Dialog opens with pre-populated form
3. User modifies fields
4. Click "Save Changes" or "Cancel"
5. Toast notification on success

#### 3.7.2 Delete Routine
1. Click delete button on routine card
2. Routine is immediately deleted
3. Toast notification with routine name
4. List updates automatically

#### 3.7.3 Add Routine
1. Click add button in header
2. Dialog opens with empty form
3. User fills required fields
4. Click "Add Routine" or "Cancel"
5. Toast notification on success

## 4. Technical Implementation

### 4.1 Component Architecture
- **Index.tsx**: Home page container
- **Management.tsx**: Management page container
- **RoutineCard.tsx**: Individual routine display
- **RoutineStats.tsx**: Progress statistics
- **AddRoutineForm.tsx**: Form component
- **MainHeader.tsx**: App header
- **BottomNavigation.tsx**: Navigation component

### 4.2 Data Flow
```
App.tsx (State Management)
├── Index.tsx (Display & Toggle)
├── Management.tsx (CRUD Operations)
└── Analytics.tsx (Data Visualization)
```

### 4.3 Props Interface
```typescript
interface IndexProps {
  routines: Routine[];
  onAddRoutine: (routine: { title: string; scheduledTime: string; frequency: string }) => void;
  onToggleRoutine: (id: string) => void;
}

interface ManagementProps {
  routines: Routine[];
  onUpdateRoutine: (id: string, updates: Partial<Routine>) => void;
  onDeleteRoutine: (id: string) => void;
  onAddRoutine: (routine: { title: string; scheduledTime: string; frequency: string }) => void;
}
```

### 4.4 Event Handlers
- **handleAddRoutine**: Open add dialog
- **handleManageRoutines**: Navigate to management
- **handleAddNewRoutine**: Add new routine
- **handleCancelAdd**: Close add dialog
- **handleEdit**: Open edit dialog
- **handleSaveEdit**: Save routine changes
- **handleDelete**: Delete routine
- **resetForm**: Clear form fields

## 5. User Experience Requirements

### 5.1 Visual Feedback
- **Hover States**: Color changes and background opacity
- **Loading States**: Button disabled states
- **Success Feedback**: Toast notifications
- **Animation**: Scale animations on interactions

### 5.2 Accessibility
- **Touch Targets**: Minimum 44px for buttons
- **Color Contrast**: WCAG AA compliance
- **Keyboard Navigation**: Tab order and focus states
- **Screen Reader**: Proper labeling and descriptions

### 5.3 Performance
- **Rendering**: Efficient list rendering
- **State Updates**: Minimal re-renders
- **Animation**: 60fps smooth animations
- **Memory**: Proper cleanup of event listeners

## 6. Error Handling

### 6.1 Form Validation
- **Required Fields**: Title must not be empty
- **Input Sanitization**: Trim whitespace
- **Time Handling**: Empty time becomes "Any time"
- **Error Messages**: Clear validation feedback

### 6.2 Edge Cases
- **Empty Routine List**: Show empty state
- **Network Errors**: Graceful degradation
- **State Corruption**: Reset to default values
- **Navigation**: Proper route handling

## 7. Future Enhancements

### 7.1 Short-term
- **Bulk Operations**: Select multiple routines
- **Drag & Drop**: Reorder routines
- **Quick Actions**: Swipe gestures
- **Search**: Filter routines by name

### 7.2 Medium-term
- **Categories**: Group routines by type
- **Templates**: Pre-defined routine templates
- **Import/Export**: Data portability
- **Offline Support**: Local storage optimization

### 7.3 Long-term
- **AI Suggestions**: Smart routine recommendations
- **Social Features**: Share routines with friends
- **Analytics**: Advanced progress tracking
- **Integration**: Third-party app connections

---

This PRD provides comprehensive requirements for the Home Page and Routine Management features, ensuring consistent user experience and technical implementation across the Apple Routine Flow application.
