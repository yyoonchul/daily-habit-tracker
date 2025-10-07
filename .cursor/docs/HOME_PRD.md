# Home Page & Routine Management - Product Requirements Document

## 1. Overview

### 1.1 Purpose
This document describes detailed requirements for the Home page and Routine Management features of Apple Routine Flow, focusing on user experience, functionality, and technical implementation.

### 1.2 Scope
- Home page (Index.tsx) - Main dashboard and routine display
- Routine Management page (Management.tsx) - Routine editing and configuration
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
- **Background**: iOS-style gradient background with glassmorphism effects
- **Container**: Max width 448px (mobile-optimized), center-aligned
- **Spacing**: 16px padding, 32px bottom padding for bottom navigation
- **Cards**: Glassmorphism cards with backdrop-blur-xl and white/10 opacity

### 2.2 Header Section Requirements

#### 2.2.1 Edit Button
- **Position**: Top-left
- **Text**: "Edit"
- **Style**: Rounded-full ghost button
- **Hover state**: iOS blue color, background 10% opacity
- **Function**: Navigate to Management page

#### 2.2.2 Main Header
- **Component**: MainHeader component
- **Purpose**: Display app branding and title
- **Position**: Center of header section

#### 2.2.3 Add Button
- **Position**: Top-right
- **Icon**: Plus icon (Lucide React)
- **Size**: 8x8 (32px), icon 5x5
- **Style**: Rounded-full ghost button
- **Hover state**: iOS blue color, background 10% opacity
- **Function**: Open Add Routine dialog

### 2.3 Statistics Section Requirements

#### 2.3.1 RoutineStats Component
- **Purpose**: Display today's progress and completion rate
- **Layout**: Full-width card with glassmorphism style
- **Content**:
  - Progress label: "Today's Progress"
  - Completion ratio: "completed/total" format
  - Progress bar: Width animation based on completion percentage
  - Percentage display: Large, emphasized percentage

#### 2.3.2 Data Calculation (based on local state)
```typescript
const completedToday = routines.filter(r => r.completedToday).length;
const totalRoutines = routines.length;
const completionRate = totalRoutines > 0 ? 
  Math.round((completedToday / totalRoutines) * 100) : 0;
```

### 2.4 Routine List Section Requirements

#### 2.4.1 Sorting Logic
- **Default sort**: Ascending by scheduled time
- **Time parsing**: Convert "HH:MM" format to minutes for comparison
- **Fallback**: "Anytime" routines are sorted at the end
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
- **Spacing**: 12px between cards
- **Conditional rendering**: Display only when routines exist
- **Card component**: RoutineCard with toggle functionality

### 2.5 Add Routine Dialog Requirements

#### 2.5.1 Dialog Structure
- **Trigger**: Clicking the Add button
- **State management**: `showAddForm` boolean state
- **Style**: Glassmorphism with backdrop-blur-xl
- **Size**: Max width 384px (max-w-sm)

#### 2.5.2 Dialog Content
- **Header**: "Add New Routine" title
- **Form**: AddRoutineForm component
- **Actions**: Add and Cancel

#### 2.5.3 Form Validation
- **Required field**: Title (trimmed)
- **Optional fields**: Time, frequency
- **Default**: Frequency = "daily"
- **Time handling**: Treat as "Anytime" if empty

### 2.6 User Interactions

#### 2.6.1 Routine Toggle
- **Action**: Tap on routine card
- **Animation**: 0.98 scale animation for 300ms
- **State update**: Toggle completion status
- **Visual feedback**: Immediate UI reflection

#### 2.6.2 Navigation
- **Edit button**: Navigate to /management
- **Add button**: Open modal dialog
- **Routine card**: Toggle completion status

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
- **Background**: Consistent with Home page
- **Container**: Max width 448px, center-aligned
- **Cards**: Glassmorphism cards showing detailed routine information
- **Actions**: Edit and Delete buttons per routine

### 3.2 Header Section Requirements

#### 3.2.1 Done Button
- **Position**: Top-left
- **Text**: "Done"
- **Style**: Rounded-full ghost button
- **Function**: Return to Home page

#### 3.2.2 Add Button
- **Position**: Top-right
- **Icon**: Plus icon (Lucide React)
- **Size**: 8x8 (32px), icon 5x5
- **Style**: Rounded-full ghost button
- **Function**: Open Add Routine dialog

### 3.3 Title Section Requirements

#### 3.3.1 Main Heading
- **Text**: "Manage Routines"
- **Style**: 2xl bold, text-text-primary
- **Position**: Centered

#### 3.3.2 Subtitle
- **Text**: "Edit and organize your routines"
- **Style**: text-sm, text-text-secondary
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
- **Title**: font-medium, text-text-primary
- **Time**: Clock icon, iOS blue color
- **Frequency**: Uppercase label, text-text-secondary
- **Streak**: "X day streak", text-ios-blue

#### 3.4.3 Action Buttons
- **Edit button**:
  - Icon: Edit2 (Lucide React)
  - Size: 4x4 (16px)
  - Color: text-text-secondary
  - Hover: bg-surface-secondary
- **Delete button**:
  - Icon: Trash2 (Lucide React)
  - Size: 4x4 (16px)
  - Color: text-red-500
  - Hover: bg-surface-secondary

#### 3.4.4 Empty State
- **Condition**: When no routines exist
- **Message**: "No routines yet"
- **Action button**: "Add Your First Routine"
- **Style**: 48px vertical padding, centered

### 3.5 Edit/Add Dialog Requirements

#### 3.5.1 Dialog Structure
- **Trigger**: Edit or Add button
- **State management**: `editingRoutine`, `showAddForm` state
- **Style**: Glassmorphism with backdrop-blur-xl
- **Size**: Max width 384px (max-w-sm)

#### 3.5.2 Form Fields
- **Routine Name**:
  - Type: Text input
  - Label: "Routine Name"
  - Placeholder: "Enter routine name..."
  - Validation: Required, trimmed
- **Time**:
  - Type: Time input
  - Label: "Time"
  - Default: Empty (auto-treated as "Anytime")
- **Frequency**:
  - Type: Select dropdown
  - Label: "Frequency"
  - Options: Daily, Weekdays, Weekends, Weekly
  - Default: "daily"

#### 3.5.3 Form Layout
- **Grid**: 2-column grid for time/frequency
- **Spacing**: 12px between items
- **Labels**: text-sm, text-text-secondary
- **Inputs**: border-surface-secondary/50 style

#### 3.5.4 Form Actions
- **Cancel button**:
  - Text: "Cancel"
  - Style: Outline variant
  - Function: Close dialog and reset form
- **Save/Add button**:
  - Text: "Save Changes" or "Add Routine"
  - Style: iOS blue background
  - Validation: Disabled when title is empty
  - Function: Save or add, then reset state

### 3.6 State Management Requirements

#### 3.6.1 Form State
```typescript
const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
const [showAddForm, setShowAddForm] = useState(false);
const [formTitle, setFormTitle] = useState("");
const [formTime, setFormTime] = useState("");
const [formFrequency, setFormFrequency] = useState("daily");
```

#### 3.6.2 State Transitions
- **Edit mode**: Set `editingRoutine`, prefill form fields
- **Add mode**: Set `showAddForm` to true
- **Cancel**: Reset all state and close dialog
- **Save**: Update routine or add new, then reset state

### 3.7 User Interactions

#### 3.7.1 Edit Routine
1. Click the Edit button on a routine card
2. Dialog opens with prefilled form
3. User modifies fields
4. Click "Save Changes" or "Cancel"
5. Show toast on success

#### 3.7.2 Delete Routine
1. Click the Delete button on a routine card
2. Routine is deleted immediately
3. Show toast with deleted routine name
4. List refreshes automatically

#### 3.7.3 Add Routine
1. Click the Add button in the header
2. Dialog opens with an empty form
3. Enter required fields
4. Click "Add Routine" or "Cancel"
5. Show toast on success

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

### 4.3 Props Interfaces
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
- **handleAddRoutine**: Open Add dialog
- **handleManageRoutines**: Navigate to Management page
- **handleAddNewRoutine**: Add a new routine
- **handleCancelAdd**: Close Add dialog
- **handleEdit**: Open Edit dialog
- **handleSaveEdit**: Save routine changes
- **handleDelete**: Delete routine
- **resetForm**: Reset form fields

## 5. User Experience Requirements

### 5.1 Visual Feedback
- **Hover states**: Changes in color and background opacity
- **Loading states**: Disabled buttons
- **Success feedback**: Toast notifications
- **Animations**: Scale animation on interactions

### 5.2 Accessibility
- **Touch targets**: Buttons minimum 44px
- **Color contrast**: WCAG AA compliant
- **Keyboard navigation**: Tab order and focus states
- **Screen reader**: Appropriate labels and descriptions

### 5.3 Performance
- **Rendering**: Efficient list rendering
- **State updates**: Minimal re-renders
- **Animations**: Smooth 60fps animations
- **Memory**: Proper cleanup of event listeners

## 6. Error Handling

### 6.1 Form Validation
- **Required fields**: Title must not be empty
- **Input sanitation**: Trim whitespace
- **Time handling**: Treat as "Anytime" if empty
- **Error messages**: Clear validation feedback

### 6.2 Edge Cases
- **No routines**: Show empty state
- **Network errors**: Graceful degradation
- **State corruption**: Reset to defaults
- **Navigation**: Correct route handling

## 7. Future Improvements

### 7.1 Short-term
- **Bulk actions**: Select multiple routines
- **Drag & Drop**: Reorder routines
- **Quick actions**: Swipe gestures
- **Search**: Filter routines by name

### 7.2 Mid-term
- **Categories**: Group routines by type
- **Templates**: Predefined routine templates
- **Import/Export**: Data portability
- **Offline support**: Local storage optimizations

### 7.3 Long-term
- **AI recommendations**: Smart routine suggestions
- **Social features**: Share routines with friends
- **Analytics**: Advanced progress tracking
- **Integrations**: Connect third-party apps

---

This PRD provides comprehensive requirements for the Home page and Routine Management features, ensuring consistent user experience and technical implementation across Apple Routine Flow.
