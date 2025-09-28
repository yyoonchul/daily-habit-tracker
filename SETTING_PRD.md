# Settings Page - Product Requirements Document

## 1. Overview

### 1.1 Purpose
This document outlines the detailed requirements for the Settings page of Apple Routine Flow, focusing on user personalization, theme customization, and app configuration.

### 1.2 Scope
- Settings Page (Settings.tsx) - User preferences and app configuration
- Theme customization functionality
- Color selection system
- Appearance mode settings
- App information display

## 2. Page Structure

### 2.1 Layout Components
```
Settings Page Layout:
├── Header Section
│   ├── "Settings" Title
│   └── Subtitle Description
├── Theme Color Section
│   ├── Section Header
│   ├── Description
│   └── Color Grid (3x2)
├── Appearance Section
│   ├── Section Header
│   ├── Description
│   └── Mode Options (Light/Dark/System)
├── About Section
│   ├── Section Header
│   └── App Information
└── Bottom Navigation
```

### 2.2 Visual Design
- **Background**: iOS-style gradient background with glassmorphism effect
- **Container**: Max-width 448px (mobile-optimized) with center alignment
- **Spacing**: 16px padding with 32px bottom padding for navigation
- **Cards**: Glassmorphism cards with backdrop-blur-xl and white/10 opacity
- **Sections**: 24px margin between cards

## 3. Header Section Requirements

### 3.1 Main Title
- **Text**: "Settings"
- **Styling**: text-2xl font-bold with text-text-primary
- **Position**: Top of page with 8px bottom margin

### 3.2 Subtitle
- **Text**: "Customize your app experience"
- **Styling**: text-text-secondary
- **Position**: Below main title

## 4. Theme Color Section Requirements

### 4.1 Section Header
- **Text**: "Theme Color"
- **Styling**: text-lg font-semibold with text-text-primary
- **Position**: Top of card with 16px bottom margin

### 4.2 Description
- **Text**: "Choose a color that will be used throughout the app"
- **Styling**: text-text-secondary mb-6 text-sm
- **Position**: Below section header

### 4.3 Color Grid Layout
- **Grid**: 3 columns with 12px gap
- **Items**: 6 color options in 2 rows
- **Button Styling**: Ghost variant with flex column layout

### 4.4 Color Options
```typescript
const colorOptions = [
  { name: 'Blue', value: '214 100% 59%', color: 'hsl(214, 100%, 59%)' },
  { name: 'Purple', value: '262 83% 58%', color: 'hsl(262, 83%, 58%)' },
  { name: 'Green', value: '142 76% 36%', color: 'hsl(142, 76%, 36%)' },
  { name: 'Orange', value: '25 95% 53%', color: 'hsl(25, 95%, 53%)' },
  { name: 'Pink', value: '330 81% 60%', color: 'hsl(330, 81%, 60%)' },
  { name: 'Red', value: '0 84% 60%', color: 'hsl(0, 84%, 60%)' }
];
```

### 4.5 Color Button Design
- **Layout**: Flex column with 8px gap
- **Padding**: 16px all around
- **Height**: Auto (h-auto)
- **Border**: 2px solid with transition-all
- **Active State**: border-primary bg-primary/10
- **Inactive State**: border-border hover:border-primary/50

### 4.6 Color Circle
- **Size**: 8x8 (32px) rounded-full
- **Background**: Dynamic color from option.color
- **Check Icon**: White check mark when selected
- **Position**: Centered with absolute positioning

### 4.7 Color Label
- **Text**: Color name (Blue, Purple, etc.)
- **Styling**: text-xs font-medium text-text-primary
- **Position**: Below color circle

## 5. Appearance Section Requirements

### 5.1 Section Header
- **Text**: "Appearance"
- **Styling**: text-lg font-semibold with text-text-primary
- **Position**: Top of card with 16px bottom margin

### 5.2 Description
- **Text**: "Choose how the app looks on your device"
- **Styling**: text-text-secondary mb-6 text-sm
- **Position**: Below section header

### 5.3 Mode Options Layout
- **Container**: space-y-4 (16px gap between options)
- **Layout**: Flex items-center justify-between
- **Options**: Light Mode, Dark Mode, System

### 5.4 Light Mode Option
- **Icon**: Sun icon (Lucide React)
- **Text**: "Light Mode"
- **Button**: Conditional styling based on theme state
- **Active State**: default variant with Check icon
- **Inactive State**: ghost variant

### 5.5 Dark Mode Option
- **Icon**: Moon icon (Lucide React)
- **Text**: "Dark Mode"
- **Button**: Conditional styling based on theme state
- **Active State**: default variant with Check icon
- **Inactive State**: ghost variant

### 5.6 System Mode Option
- **Icon**: Monitor icon (Lucide React)
- **Text**: "System"
- **Button**: Conditional styling based on theme state
- **Active State**: default variant with Check icon
- **Inactive State**: ghost variant

### 5.7 Mode Button Design
- **Size**: Small (sm) with h-8 px-3
- **Check Icon**: 4x4 (16px) with 4px right margin
- **Conditional Rendering**: Check icon only when active
- **Text**: Mode name (Light, Dark, Auto)

## 6. About Section Requirements

### 6.1 Section Header
- **Text**: "About"
- **Styling**: text-lg font-semibold with text-text-primary
- **Position**: Top of card with 16px bottom margin

### 6.2 App Information Layout
- **Container**: space-y-3 (12px gap between items)
- **Layout**: Flex justify-between for each row
- **Items**: Version and Build information

### 6.3 Version Information
- **Label**: "Version"
- **Value**: "1.0.0"
- **Styling**: text-sm with text-text-secondary (label) and text-text-primary (value)

### 6.4 Build Information
- **Label**: "Build"
- **Value**: "2024.01"
- **Styling**: text-sm with text-text-secondary (label) and text-text-primary (value)

## 7. State Management Requirements

### 7.1 Theme Context Integration
```typescript
const { primaryColor, setPrimaryColor } = useTheme();
const { theme, setTheme } = useNextTheme();
```

### 7.2 Color State Management
- **Current Color**: Retrieved from ThemeContext
- **Color Selection**: Updates primaryColor via setPrimaryColor
- **Persistence**: Stored in localStorage via ThemeContext
- **Real-time Updates**: Immediate UI reflection

### 7.3 Theme State Management
- **Current Theme**: Retrieved from next-themes
- **Theme Selection**: Updates theme via setTheme
- **Options**: 'light', 'dark', 'system'
- **Persistence**: Handled by next-themes

## 8. User Interactions

### 8.1 Color Selection
1. User taps on color option
2. setPrimaryColor called with HSL value
3. ThemeContext updates CSS variables
4. UI reflects new color immediately
5. Selection persists across app sessions

### 8.2 Theme Mode Selection
1. User taps on mode option (Light/Dark/System)
2. setTheme called with mode value
3. next-themes updates app theme
4. UI reflects new theme immediately
5. Selection persists across app sessions

### 8.3 Visual Feedback
- **Color Selection**: Border and background changes
- **Theme Selection**: Button variant changes
- **Hover States**: Subtle color and opacity changes
- **Transitions**: Smooth 200ms transitions

## 9. Technical Implementation

### 9.1 Component Architecture
- **Settings.tsx**: Main settings container
- **ThemeContext**: Color management
- **next-themes**: Theme mode management
- **BottomNavigation**: Navigation component

### 9.2 Dependencies
```typescript
import { useTheme, colorPresets } from "@/contexts/ThemeContext";
import { useTheme as useNextTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Moon, Sun, Monitor } from "lucide-react";
```

### 9.3 CSS Variable Updates
```typescript
const updateCSSVariables = (color: string) => {
  const root = document.documentElement;
  const [h, s, l] = color.split(' ').map(v => v.replace('%', ''));
  
  root.style.setProperty('--primary', color);
  root.style.setProperty('--ios-blue', color);
  root.style.setProperty('--ring', color);
  
  const lightColor = `${h} ${s}% ${Math.min(parseInt(l) + 6, 100)}%`;
  const darkColor = `${h} ${s}% ${Math.max(parseInt(l) - 6, 0)}%`;
  
  root.style.setProperty('--ios-blue-light', lightColor);
  root.style.setProperty('--ios-blue-dark', darkColor);
};
```

## 10. Accessibility Requirements

### 10.1 Color Contrast
- **WCAG AA Compliance**: All color combinations meet contrast requirements
- **Text Readability**: Clear distinction between text and background
- **Icon Visibility**: Sufficient contrast for all icons

### 10.2 Touch Targets
- **Minimum Size**: 44px for all interactive elements
- **Color Buttons**: 64px height with adequate padding
- **Mode Buttons**: 32px height with proper spacing

### 10.3 Keyboard Navigation
- **Tab Order**: Logical sequence through all options
- **Focus States**: Clear visual indication of focus
- **Enter/Space**: Activate selected options

### 10.4 Screen Reader Support
- **Labels**: Proper labeling for all interactive elements
- **Descriptions**: Clear descriptions for color and theme options
- **State Announcements**: Screen reader announcements for changes

## 11. Performance Requirements

### 11.1 Rendering Performance
- **Color Updates**: Immediate CSS variable updates
- **Theme Changes**: Smooth transitions without flicker
- **Re-renders**: Minimal component re-renders

### 11.2 State Persistence
- **localStorage**: Efficient storage and retrieval
- **Theme Context**: Optimized context updates
- **next-themes**: Efficient theme management

### 11.3 Animation Performance
- **Transitions**: 60fps smooth animations
- **Color Changes**: Instant visual feedback
- **Theme Switches**: Smooth mode transitions

## 12. Error Handling

### 12.1 Color Validation
- **HSL Format**: Validate HSL color format
- **Fallback**: Default to blue if invalid color
- **Error Recovery**: Graceful handling of invalid values

### 12.2 Theme Validation
- **Mode Validation**: Ensure valid theme mode
- **Fallback**: Default to system mode
- **Error Recovery**: Reset to safe default

### 12.3 Storage Errors
- **localStorage**: Handle storage quota exceeded
- **Fallback**: In-memory storage if localStorage fails
- **Error Recovery**: Graceful degradation

## 13. Future Enhancements

### 13.1 Short-term
- **Custom Colors**: User-defined color picker
- **Color Presets**: Additional predefined color options
- **Theme Preview**: Live preview of color changes
- **Accessibility**: High contrast mode option

### 13.2 Medium-term
- **Advanced Themes**: Custom theme creation
- **Theme Sharing**: Export/import theme settings
- **Seasonal Themes**: Automatic theme switching
- **Accessibility**: Enhanced accessibility options

### 13.3 Long-term
- **AI Themes**: AI-generated color schemes
- **Dynamic Themes**: Time-based theme changes
- **User Profiles**: Multiple user configurations
- **Integration**: System theme integration

## 14. Testing Requirements

### 14.1 Unit Tests
- **Color Selection**: Test color state updates
- **Theme Changes**: Test theme mode changes
- **State Persistence**: Test localStorage functionality
- **Component Rendering**: Test all UI elements

### 14.2 Integration Tests
- **Theme Context**: Test context integration
- **next-themes**: Test theme library integration
- **CSS Variables**: Test CSS variable updates
- **User Interactions**: Test all user interactions

### 14.3 Accessibility Tests
- **Color Contrast**: Test all color combinations
- **Keyboard Navigation**: Test keyboard accessibility
- **Screen Reader**: Test screen reader compatibility
- **Touch Targets**: Test touch target sizes

## 15. Success Metrics

### 15.1 User Engagement
- **Settings Usage**: 80% of users access settings
- **Color Changes**: 60% of users change colors
- **Theme Changes**: 70% of users change themes
- **Return Rate**: 90% of users return to settings

### 15.2 User Satisfaction
- **Color Satisfaction**: 85% satisfaction with color options
- **Theme Satisfaction**: 90% satisfaction with theme options
- **Ease of Use**: 95% find settings easy to use
- **Performance**: 98% satisfaction with performance

### 15.3 Technical Metrics
- **Load Time**: Settings page loads in <1 second
- **Color Updates**: Color changes apply in <100ms
- **Theme Switches**: Theme changes apply in <200ms
- **Error Rate**: <1% error rate for settings operations

---

This PRD provides comprehensive requirements for the Settings page, ensuring a personalized and accessible user experience while maintaining high performance and usability standards.
