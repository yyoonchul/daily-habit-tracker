# Analytics Pages - Product Requirements Document

## 1. Overview

### 1.1 Purpose
This document outlines the detailed requirements for the Analytics feature of Apple Routine Flow, including the main Analytics page and its four distinct sections: Overview, Trends, Activity, and Routines.

### 1.2 Scope
- Main Analytics Page (Analytics.tsx) - Navigation and section management
- Overview Section (OverviewSection.tsx) - Performance summary
- Trends Section (TrendSection.tsx) - Completion rate trends
- Activity Section (ActivitySection.tsx) - Monthly activity heatmap
- Routines Section (RoutinesSection.tsx) - Individual routine analytics

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
- **Container**: Max-width 448px (mobile-optimized) with center alignment
- **Height**: Full viewport height with 32px bottom padding
- **Overflow**: Hidden to create smooth slider effect

### 2.2 Slider Container Requirements

#### 2.2.1 Section Management
- **Total Sections**: 4 sections (Overview, Trends, Activity, Routines)
- **Current Section**: State-managed with useState
- **Direction**: Animation direction (-1: up, 0: normal, 1: down)
- **Height**: calc(100vh - 120px) for optimal mobile viewing

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
- **Callback**: onTransitionEnd to reset direction

### 2.3 Navigation Controls Requirements

#### 2.3.1 Navigation Buttons
- **Position**: Absolute right-4, top-1/2
- **Styling**: Glassmorphism with backdrop-blur-xl
- **Size**: 10x10 (40px) with 5x5 icons
- **Icons**: ChevronUp and ChevronDown (Lucide React)
- **Hover**: bg-white/20 with iOS blue text

#### 2.3.2 Section Indicators
- **Layout**: Vertical column with 8px gap
- **Size**: 2x2 (8px) circles
- **Active State**: iOS blue with scale-125
- **Inactive State**: bg-white/30 with hover:bg-white/50
- **Functionality**: Direct section navigation

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
- **Position**: Centered below slider
- **Text**: Current section title
- **Styling**: text-sm with text-text-secondary
- **Content**: Dynamic based on currentSection state

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

### 3.2 Data Calculations
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
- **Value**: Large 3xl font-bold percentage
- **Label**: "Today's Completion"
- **Styling**: Glassmorphism with centered content

#### 3.3.2 Secondary Cards
- **Layout**: 2-column grid with 16px gap
- **Average Streak Card**:
  - Icon: TrendingUp (6x6, iOS blue)
  - Value: xl font-bold number
  - Label: "Average Streak"
- **Total Routines Card**:
  - Icon: Calendar (6x6, iOS blue)
  - Value: xl font-bold number
  - Label: "Total Routines"

### 3.4 Animation
- **Class**: animate-fade-in
- **Purpose**: Smooth entrance animation
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

#### 4.2.2 Period Selector UI
- **Layout**: Horizontal flex with 4px gap
- **Background**: bg-surface-secondary/30 with rounded-lg
- **Padding**: 4px internal padding
- **Active State**: iOS blue background with white text
- **Inactive State**: Ghost button with hover effects

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

#### 4.3.2 Chart Configuration
- **Library**: Recharts LineChart
- **Height**: 256px (h-64)
- **Responsive**: 100% width and height
- **Grid**: CartesianGrid with 3px dash pattern
- **Axes**: Custom styling with no lines
- **Tooltip**: Custom styling with glassmorphism

#### 4.3.3 Line Styling
- **Type**: monotone
- **Color**: iOS blue (HSL)
- **Width**: 2px
- **Dots**: 3px radius, iOS blue fill
- **Active Dots**: 5px radius, iOS blue fill

### 4.4 Chart Container
- **Card**: Glassmorphism with backdrop-blur-xl
- **Padding**: 16px
- **Border**: border-white/20
- **Shadow**: shadow-lg
- **Header**: "Completion Rate Trend" with TrendingUp icon

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
- **Previous Button**: ChevronLeft icon, 8x8 size
- **Month Display**: format(currentMonth, 'MMMM yyyy')
- **Next Button**: ChevronRight icon, 8x8 size
- **Styling**: Ghost buttons with hover effects

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
- **Columns**: 7 (Sunday to Saturday)
- **Day Headers**: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
- **Empty Days**: Calculated based on month start day
- **Data Days**: Each day of the month

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

#### 5.4.2 Day Cell Styling
- **Size**: aspect-square (1:1 ratio)
- **Border Radius**: rounded-sm
- **Hover**: scale-110 with opacity-80
- **Text**: White text with font-medium
- **Cursor**: pointer for interactivity

### 5.5 Tooltip System
- **Provider**: TooltipProvider wrapper
- **Trigger**: Each day cell
- **Content**: Date and completion percentage
- **Styling**: Custom tooltip with glassmorphism

### 5.6 Legend
- **Position**: Bottom of calendar
- **Layout**: Flex with justify-between
- **Items**: "Less" text, color squares, "More" text
- **Colors**: 4 intensity levels with increasing opacity

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
- **Card**: Glassmorphism with backdrop-blur-xl
- **Padding**: 16px
- **Max Height**: 384px (max-h-96)
- **Overflow**: overflow-y-auto for scrolling

#### 6.2.2 Routine Items
- **Layout**: Flex with justify-between
- **Padding**: 12px
- **Background**: bg-surface-secondary/30
- **Border Radius**: rounded-xl
- **Hover**: bg-surface-secondary/50
- **Cursor**: pointer for selection

#### 6.2.3 Routine Information
- **Title**: font-medium, text-sm, truncate
- **Metadata**: frequency • scheduledTime
- **Streak**: iOS blue, font-semibold
- **Status**: Completed/Pending with color coding

### 6.3 Detail Dialog

#### 6.3.1 Dialog Structure
- **Trigger**: Click on routine item
- **State**: selectedRoutine state management
- **Size**: max-w-sm (384px)
- **Background**: bg-background/95 with backdrop-blur-xl

#### 6.3.2 Statistics Display
- **Layout**: 2-column grid
- **Current Streak**: 2xl font-bold, iOS blue
- **Success Rate**: 2xl font-bold, iOS blue
- **Labels**: text-xs with text-text-secondary

#### 6.3.3 Activity Calendar
- **Header**: "Activity Calendar" with month navigation
- **Grid**: 7-column calendar layout
- **Data**: Individual routine completion history
- **Styling**: Completed days in iOS blue, others in surface-secondary

#### 6.3.4 Additional Statistics
- **Best Streak**: Calculated value (current + 3)
- **Total Completions**: Calculated from success rate
- **Frequency**: Capitalized routine frequency
- **Layout**: Space-y-2 with justify-between

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

### 7.2 Props Interface
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
- **currentSection**: Current active section (0-3)
- **direction**: Animation direction (-1, 0, 1)
- **selectedPeriod**: Trend period selection
- **currentMonth**: Calendar month selection
- **selectedRoutine**: Individual routine for details

### 7.4 Animation System
- **Transform**: translateY for vertical sliding
- **Duration**: 500ms ease-in-out
- **Direction**: Handles circular navigation
- **Callback**: onTransitionEnd for state reset

## 8. User Experience Requirements

### 8.1 Navigation
- **Swipe Gestures**: Vertical swiping between sections
- **Button Navigation**: Previous/Next buttons
- **Direct Navigation**: Section indicator dots
- **Circular Navigation**: Seamless loop between first and last sections

### 8.2 Visual Feedback
- **Active States**: Clear indication of current section
- **Hover Effects**: Interactive elements with hover states
- **Loading States**: Smooth transitions between sections
- **Tooltips**: Detailed information on hover

### 8.3 Responsive Design
- **Mobile First**: Optimized for mobile viewport
- **Touch Targets**: Minimum 44px for interactive elements
- **Scroll Behavior**: Smooth scrolling within sections
- **Overflow Handling**: Proper content clipping

## 9. Performance Requirements

### 9.1 Rendering
- **Efficient Updates**: Minimal re-renders on state changes
- **Lazy Loading**: Components loaded as needed
- **Memory Management**: Proper cleanup of event listeners
- **Animation Performance**: 60fps smooth animations

### 9.2 Data Handling
- **Mock Data**: Simulated data for demonstration
- **Caching**: Efficient data storage and retrieval
- **Calculation**: Optimized mathematical operations
- **Updates**: Real-time data synchronization

## 10. Accessibility Requirements

### 10.1 Visual Accessibility
- **Color Contrast**: WCAG AA compliance
- **Text Size**: Minimum 12px for readability
- **Icons**: Meaningful icon usage
- **Focus States**: Clear focus indicators

### 10.2 Interaction Accessibility
- **Keyboard Navigation**: Tab order and focus management
- **Screen Reader**: Proper ARIA labels
- **Touch Targets**: Minimum 44px touch targets
- **Gesture Support**: Alternative interaction methods

## 11. Future Enhancements

### 11.1 Short-term
- **Real Data**: Replace mock data with actual user data
- **Export Features**: Data export in various formats
- **Custom Periods**: User-defined time ranges
- **Filtering**: Filter data by routine type

### 11.2 Medium-term
- **Advanced Charts**: More chart types and visualizations
- **Predictions**: AI-powered trend predictions
- **Comparisons**: Compare different time periods
- **Sharing**: Share analytics with others

### 11.3 Long-term
- **Machine Learning**: Intelligent insights and recommendations
- **Integration**: Connect with external health apps
- **Social Features**: Compare with friends' progress
- **Advanced Analytics**: Deep dive into habit patterns

---

This PRD provides comprehensive requirements for the Analytics feature, ensuring a rich, interactive, and informative user experience for tracking routine performance and progress.
