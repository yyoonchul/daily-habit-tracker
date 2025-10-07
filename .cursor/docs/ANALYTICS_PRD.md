# Analytics Page - Product Requirements Document

## 1. Overview

### 1.1 Purpose
This document outlines detailed requirements for the analytics features of Apple Routine Flow, covering the main analytics page and four sections (Overview, Trends, Activity, Routines).

### 1.2 Scope
- Main analytics page (Analytics.tsx) - Navigation and section management
- Overview section (OverviewSection.tsx) - Performance summary
- Trends section (TrendSection.tsx) - Completion rate trends
- Activity section (ActivitySection.tsx) - Monthly activity heatmap
- Routines section (RoutinesSection.tsx) - Individual routine analytics

## 2. Main Analytics Page Requirements

### 2.1 Page Structure

#### 2.1.1 Layout Components
```
Analytics Page Layout:
├── Slider Container
│   ├── Section 1: Overview
│   ├── Section 2: Trends
│   ├── Section 3: Activity
│   └── Section 4: Routines
├── Navigation Controls
│   ├── Previous Button
│   ├── Section Indicators
│   └── Next Button
├── Section Title Display
└── Bottom Navigation
```

#### 2.1.2 Visual Design
- **Background**: iOS-style gradient with glassmorphism effects
- **Container**: Max width 448px (mobile-optimized), center-aligned
- **Height**: Full viewport height, 32px bottom padding
- **Overflow**: Hidden to enable smooth slider effects

### 2.2 Slider Container Requirements

#### 2.2.1 Section Management
- **Total sections**: 4 (Overview, Trends, Activity, Routines)
- **Current section**: Managed via useState
- **Direction**: Animation direction (-1: up, 0: normal, 1: down)
- **Height**: calc(100vh - 120px) for mobile optimization

#### 2.2.2 Animation System
```typescript
const getTransform = () => {
  if (direction === -1) {
    // Up animation (1->4)
    return `translateY(${100}%)`;
  } else if (direction === 1) {
    // Down animation (4->1)
    return `translateY(-${(sections.length) * 100}%)`;
  } else {
    // Normal slide
    return `translateY(-${currentSection * 100}%)`;
  }
};
```

#### 2.2.3 Transition Properties
- **Duration**: 500ms
- **Easing**: ease-in-out
- **Transform**: translateY for vertical sliding
- **Callback**: onTransitionEnd for direction reset

### 2.3 Navigation Controls Requirements

#### 2.3.1 Navigation Buttons
- **Position**: Right 4, top 1/2 (absolute)
- **Style**: Glassmorphism, backdrop-blur-xl
- **Size**: 10x10 (40px), icon 5x5
- **Icons**: ChevronUp, ChevronDown (Lucide React)
- **Hover**: bg-white/20, iOS blue text

#### 2.3.2 Section Indicators
- **Layout**: Vertical column, 8px spacing
- **Size**: 2x2 (8px) circles
- **Active**: iOS blue, scale-125
- **Inactive**: bg-white/30, hover:bg-white/50
- **Function**: Jump to section directly

#### 2.3.3 Navigation Logic
```typescript
const handlePrevSection = () => {
  if (currentSection === 0) {
    setDirection(-1);
    setCurrentSection(sections.length - 1);
  } else {
    setDirection(0);
    setCurrentSection(prev => prev - 1);
  }
};

const handleNextSection = () => {
  if (currentSection === sections.length - 1) {
    setDirection(1);
    setCurrentSection(0);
  } else {
    setDirection(0);
    setCurrentSection(prev => prev + 1);
  }
};
```

### 2.4 Section Title Display
- **Position**: Bottom center of the slider
- **Text**: Current section title
- **Style**: text-sm, text-text-secondary
- **Content**: Dynamically changes based on currentSection state

## 3. Overview Section Requirements

### 3.1 Section Structure
```
Overview Section:
├── Header
│   ├── "Overview" Title
│   └── "Today's performance summary" Subtitle
├── Main Card
│   ├── Target Icon
│   ├── Completion Percentage
│   └── "Today's Completion" Label
└── Secondary Cards
    ├── Average Streak Card
    └── Total Routines Card
```

### 3.2 Data Calculation
```typescript
const completionRate = routines.length > 0 
  ? Math.round((routines.filter(r => r.completed).length / routines.length) * 100) 
  : 0;

const averageStreak = routines.length > 0 
  ? Math.round(routines.reduce((sum, r) => sum + r.streak, 0) / routines.length)
  : 0;
```

### 3.3 Visual Components

#### 3.3.1 Main Completion Card
- **Icon**: Target (8x8, iOS blue)
- **Value**: 3xl, bold percentage text
- **Label**: "Today's Completion"
- **Style**: Glassmorphism, centered

#### 3.3.2 Secondary Cards
- **Layout**: 2-column grid, 16px spacing
- **Average Streak Card**:
  - Icon: TrendingUp (6x6, iOS blue)
  - Value: xl, bold number
  - Label: "Average Streak"
- **Total Routines Card**:
  - Icon: Calendar (6x6, iOS blue)
  - Value: xl, bold number
  - Label: "Total Routines"

### 3.4 Animations
- **Class**: animate-fade-in
- **Purpose**: Smooth entry animation
- **Timing**: Coordinated with section transitions

## 4. Trends Section Requirements

### 4.1 Section Structure
```
Trends Section:
├── Header
│   ├── "Trends" Title
│   └── "Completion rate over time" Subtitle
├── Period Selector
│   ├── 1 Month Button
│   ├── 3 Months Button
│   ├── 1 Year Button
│   └── All Time Button
└── Chart Container
    └── Line Chart (Recharts)
```

### 4.2 Period Selection

#### 4.2.1 Available Periods
```typescript
const periods = [
  { key: '1month', label: '1 Month', days: 30 },
  { key: '3months', label: '3 Months', days: 90 },
  { key: '1year', label: '1 Year', days: 365 },
  { key: 'alltime', label: 'All Time', days: 730 }
];
```

#### 4.2.2 Period Selection UI
- **Layout**: Horizontal flex, 4px spacing
- **Background**: bg-surface-secondary/30, rounded-lg
- **Padding**: 4px inner padding
- **Active**: iOS blue background, white text
- **Inactive**: Ghost buttons with hover effects

### 4.3 Chart Implementation

#### 4.3.1 Data Generation
```typescript
const completionData = Array.from({ length: Math.min(currentPeriod.days, 100) }, (_, i) => {
  const date = subDays(new Date(), (currentPeriod.days - 1) - i);
  const completionRate = Math.floor(Math.random() * 40) + 60; // 60-100% range
  return {
    date: currentPeriod.days <= 30 ? format(date, 'MM/dd') : 
          currentPeriod.days <= 90 ? format(date, 'MM/dd') :
          format(date, 'MM/yy'),
    fullDate: date,
    rate: completionRate
  };
});
```

#### 4.3.2 Chart Setup (React Native)
- **Rendering**: Custom chart based on `react-native-svg` (or an RN-compatible chart library)
- **Height**: Fixed around 256px, width 100% of container
- **Grid/axes/tooltips**: Custom via SVG elements, placed inside a glassmorphism card

#### 4.3.3 Line Style
- **Type**: monotone
- **Color**: iOS blue (HSL)
- **Thickness**: 2px
- **Dots**: Radius 3px, filled with iOS blue
- **Active dot**: Radius 5px, filled with iOS blue

### 4.4 Chart Container
- **Card**: Glassmorphism, backdrop-blur-xl
- **Padding**: 16px
- **Border**: border-white/20
- **Shadow**: shadow-lg
- **Header**: "Completion Rate Trend" + TrendingUp icon

## 5. Activity Section Requirements

### 5.1 Section Structure
```
Activity Section:
├── Header
│   ├── "Activity" Title
│   └── "Monthly completion heatmap" Subtitle
└── Calendar Container
    ├── Month Navigation
    ├── Day Headers
    ├── Calendar Grid
    └── Legend
```

### 5.2 Month Navigation

#### 5.2.1 Navigation Controls
- **Previous button**: ChevronLeft icon, 8x8 size
- **Month label**: format(currentMonth, 'MMMM yyyy')
- **Next button**: ChevronRight icon, 8x8 size
- **Style**: Ghost buttons with hover effects

#### 5.2.2 Month State Management
```typescript
const [currentMonth, setCurrentMonth] = useState(new Date());

const handlePrevMonth = () => {
  setCurrentMonth(prev => subMonths(prev, 1));
};

const handleNextMonth = () => {
  setCurrentMonth(prev => addMonths(prev, 1));
};
```

### 5.3 Calendar Grid

#### 5.3.1 Grid Structure
- **Columns**: 7 (Sunday–Saturday)
- **Day headers**: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
- **Empty cells**: Calculated based on the month's start day
- **Data dates**: Each day of the month

#### 5.3.2 Data Generation
```typescript
const monthStart = startOfMonth(currentMonth);
const monthEnd = endOfMonth(currentMonth);
const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

const startDayOfWeek = monthStart.getDay();
const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => null);

const calendarData = daysInMonth.map(date => ({
  date,
  rate: Math.floor(Math.random() * 40) + 60
}));
```

### 5.4 Heatmap Visualization

#### 5.4.1 Intensity Levels
```typescript
const getCalendarIntensity = (rate: number) => {
  if (rate >= 90) return "bg-ios-blue";
  if (rate >= 70) return "bg-ios-blue/70";
  if (rate >= 50) return "bg-ios-blue/40";
  return "bg-surface-secondary/50";
};
```

#### 5.4.2 Day Cell Styles
- **Size**: aspect-square (1:1 ratio)
- **Corners**: rounded-sm
- **Hover**: scale-110, opacity-80
- **Text**: White, font-medium
- **Cursor**: Pointer for interactivity

### 5.5 Tooltip System
- **Provider**: TooltipProvider wrapper
- **Trigger**: Each day cell
- **Content**: Date and completion percentage
- **Style**: Custom glassmorphism styling

### 5.6 Legend
- **Position**: Bottom of calendar
- **Layout**: Flex, justify-between
- **Items**: "Less" text, color squares, "More" text
- **Colors**: 4-step intensity with gradual opacity

## 6. Routines Section Requirements

### 6.1 Section Structure
```
Routines Section:
├── Header
│   ├── "Routines" Title
│   └── "Individual routine details" Subtitle
├── Routine List
│   └── Routine Items
└── Detail Dialog
    ├── Statistics
    ├── Activity Calendar
    └── Additional Info
```

### 6.2 Routine List

#### 6.2.1 List Container
- **Card**: Glassmorphism, backdrop-blur-xl
- **Padding**: 16px
- **Max height**: 384px (max-h-96)
- **Overflow**: overflow-y-auto for scrolling

#### 6.2.2 Routine Items
- **Layout**: Flex, justify-between
- **Padding**: 12px
- **Background**: bg-surface-secondary/30
- **Corners**: rounded-xl
- **Hover**: bg-surface-secondary/50
- **Cursor**: Pointer for selection

#### 6.2.3 Routine Information
- **Title**: font-medium, text-sm, truncate
- **Metadata**: frequency • scheduledTime
- **Streak**: iOS blue, font-semibold
- **Status**: Completed/Pending (with color distinctions)

### 6.3 Detail Dialog

#### 6.3.1 Dialog Structure
- **Trigger**: Click routine item
- **State**: Manage with selectedRoutine
- **Size**: max-w-sm (384px)
- **Background**: bg-background/95, backdrop-blur-xl

#### 6.3.2 Statistics Display
- **Layout**: 2-column grid
- **Current streak**: 2xl bold, iOS blue
- **Success rate**: 2xl bold, iOS blue
- **Labels**: text-xs, text-text-secondary

#### 6.3.3 Activity Calendar
- **Header**: "Activity Calendar", includes month navigation
- **Grid**: 7-column calendar layout
- **Data**: Completion history per routine
- **Style**: Completed days in iOS blue, others in surface-secondary

#### 6.3.4 Additional Statistics
- **Best streak**: Computed value (current + 3)
- **Total completions**: Derived from success rate
- **Frequency**: Routine frequency in uppercase
- **Layout**: Space-y-2, justify-between

### 6.4 Data Management

#### 6.4.1 Routine History
```typescript
const getRoutineHistory = (routineId: string, month: Date) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  return daysInMonth.filter(() => Math.random() > 0.3); // 70% completion rate
};
```

#### 6.4.2 State Management
```typescript
const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
const [currentMonth, setCurrentMonth] = useState(new Date());
```

## 7. Technical Implementation

### 7.1 Component Architecture
```
Analytics.tsx (Main Container)
├── OverviewSection.tsx
├── TrendSection.tsx
├── ActivitySection.tsx
└── RoutinesSection.tsx
```

### 7.2 Props Interfaces
```typescript
interface AnalyticsProps {
  routines: Routine[];
}

interface Routine {
  id: string;
  title: string;
  completed: boolean;
  streak: number;
  frequency: string;
  scheduledTime: string;
  monthlySuccessRate: number;
}
```

### 7.3 State Management
- **currentSection**: Currently active section (0–3)
- **direction**: Animation direction (-1, 0, 1)
- **selectedPeriod**: Selected trend period
- **currentMonth**: Selected calendar month
- **selectedRoutine**: Individual routine for detail view

### 7.4 Animation System
- **Transform**: translateY for vertical sliding
- **Duration**: 500ms ease-in-out
- **Direction**: Handle cyclic navigation
- **Callback**: onTransitionEnd for state reset

## 8. User Experience Requirements

### 8.1 Navigation
- **Swipe gestures**: Vertical swipe between sections
- **Button navigation**: Previous/Next buttons
- **Direct jump**: Section indicator dots
- **Cyclic navigation**: Infinite loop between first and last sections

### 8.2 Visual Feedback
- **Active state**: Clear indication of current section
- **Hover effects**: Hover states for interactive elements
- **Loading state**: Smooth transitions between sections
- **Tooltip**: Show detailed information on hover

### 8.3 Responsive Design
- **Mobile-first**: Optimized for mobile viewports
- **Touch targets**: Minimum 44px for interactive elements
- **Scroll behavior**: Smooth scrolling within sections
- **Overflow handling**: Appropriate content clipping

## 9. Performance Requirements

### 9.1 Rendering
- **Efficient updates**: Minimize re-renders on state changes
- **Lazy loading**: Load components when needed
- **Memory management**: Cleanup event listeners
- **Animation performance**: Smooth 60fps animations

### 9.2 Data Handling
- **Mock data**: Simulated data for demos
- **Caching**: Efficient storage and retrieval
- **Computation**: Optimized calculations
- **Updates**: Real-time data synchronization

## 10. Accessibility Requirements

### 10.1 Visual Accessibility
- **Color contrast**: WCAG AA compliant
- **Text size**: Minimum 12px for readability
- **Icons**: Use meaningful icons
- **Focus states**: Clear focus indication

### 10.2 Interaction Accessibility
- **Keyboard navigation**: Manage tab order and focus
- **Screen reader**: Appropriate ARIA labels
- **Touch targets**: Touch areas of 44px or larger
- **Gesture support**: Provide alternative interaction methods

## 11. Future Improvements

### 11.1 Short-term
- **Real data**: Replace mock data with real user data
- **Export**: Export data in various formats
- **Custom period**: User-defined time ranges
- **Filtering**: Filters by routine type

### 11.2 Mid-term
- **Advanced charts**: More chart types and visualizations
- **Forecasting**: AI-based trend predictions
- **Comparison**: Compare across periods
- **Sharing**: Share analytics results

### 11.3 Long-term
- **Machine learning**: Intelligent insights and recommendations
- **Integrations**: Connect external health apps
- **Social features**: Compare progress with friends
- **Advanced analytics**: Deep analysis of habit patterns

---

This PRD provides comprehensive requirements for analytics features, ensuring a rich and interactive user experience for tracking routine performance and progress.
