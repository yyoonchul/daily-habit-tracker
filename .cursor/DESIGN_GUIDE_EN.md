# Apple Routine Flow - Design Guide

## 1. Design Philosophy

### 1.1 Core Principles
- **iOS Native Experience**: Consistent user experience based on Apple's design language
- **Liquid Glass**: iOS 26 liquid glass effects for premium visual experience
- **Glassmorphism**: Modern visual hierarchy using transparency and blur effects
- **Minimalism**: Removing unnecessary elements and focusing on core functionality
- **Accessibility**: Inclusive design that is easy for all users to use

### 1.2 Design Goals
- Intuitive interface with low learning curve
- Visually appealing yet functional design
- Consistent brand experience
- Mobile-first responsive design

## 2. Color System

### 2.1 Primary Color Palette

#### 2.1.1 Primary Colors
```css
/* iOS Blue System */
--ios-blue: 214 100% 59%;        /* Default blue */
--ios-blue-light: 214 100% 65%;  /* Light blue */
--ios-blue-dark: 214 100% 53%;   /* Dark blue */
```

#### 2.1.2 Success Colors
```css
/* Success/Completion colors */
--success: 142 76% 36%;          /* Default green */
--success-light: 142 69% 58%;    /* Light green */
```

#### 2.1.3 Surface Colors
```css
/* Card and surface colors */
--card-surface: 0 0% 100%;       /* Card background */
--card-hover: 0 0% 97%;          /* Card hover */
--surface-secondary: 220 14% 96%; /* Secondary surface */
```

### 2.2 Text Hierarchy

#### 2.2.1 Light Mode
```css
--text-primary: 215 20% 15%;     /* Primary text */
--text-secondary: 215 16% 47%;  /* Secondary text */
--text-tertiary: 215 12% 63%;    /* Tertiary text */
```

#### 2.2.2 Dark Mode
```css
--text-primary: 0 0% 98%;        /* Primary text */
--text-secondary: 215 10% 70%;   /* Secondary text */
--text-tertiary: 215 10% 55%;    /* Tertiary text */
```

### 2.3 Theme Color System

#### 2.3.1 Custom Colors
```typescript
const colorPresets = {
  blue: '214 100% 59%',    /* Blue */
  purple: '262 83% 58%',   /* Purple */
  green: '142 76% 36%',    /* Green */
  orange: '25 95% 53%',    /* Orange */
  pink: '330 81% 60%',     /* Pink */
  red: '0 84% 60%',        /* Red */
};
```

#### 2.3.2 Dynamic Color Generation
- **Light Variant**: Base lightness + 6%
- **Dark Variant**: Base lightness - 6%
- **Real-time Application**: Immediate reflection through CSS variables

## 3. Typography

### 3.1 Font Hierarchy

#### 3.1.1 Title Hierarchy
```css
/* Main title */
.text-2xl.font-bold.text-text-primary

/* Section title */
.text-xl.font-bold.text-text-primary

/* Card title */
.text-lg.font-semibold.text-text-primary
```

#### 3.1.2 Body Text
```css
/* Primary body */
.text-base.font-medium.text-text-primary

/* Secondary text */
.text-sm.text-text-secondary

/* Small text */
.text-xs.text-text-tertiary
```

### 3.2 Text Styling

#### 3.2.1 Font Weights
- **Bold**: `font-bold` - Titles and emphasis
- **Semibold**: `font-semibold` - Subtitles
- **Medium**: `font-medium` - Body text
- **Regular**: Default weight

#### 3.2.2 Sizes
- **2xl**: 24px - Main titles
- **xl**: 20px - Section titles
- **lg**: 18px - Card titles
- **base**: 16px - Body text
- **sm**: 14px - Secondary text
- **xs**: 12px - Small text

## 4. Liquid Glass Design System

### 4.1 Liquid Glass Components

#### 4.1.1 LiquidGlassView
```tsx
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

// Basic liquid glass view
<LiquidGlassView
  style={[
    { width: 200, height: 100, borderRadius: 20 },
    !isLiquidGlassSupported && { backgroundColor: 'rgba(255,255,255,0.5)' },
  ]}
  interactive
  effect="clear"
>
  <Text>Hello World</Text>
</LiquidGlassView>
```

#### 4.1.2 Liquid Glass Effects
```tsx
// Clear effect - More transparent
<LiquidGlassView effect="clear" />

// Regular effect - Standard glass blur
<LiquidGlassView effect="regular" />

// No effect - Transparent view
<LiquidGlassView effect="none" />
```

#### 4.1.3 Interactive Glass
```tsx
// Interactive glass with touch effects
<LiquidGlassView
  interactive
  effect="clear"
  tintColor="rgba(0, 122, 255, 0.1)"
  colorScheme="system"
>
  <Text>Interactive Glass</Text>
</LiquidGlassView>
```

### 4.2 Liquid Glass Container

#### 4.2.1 Merging Glass Elements
```tsx
import { LiquidGlassContainerView } from '@callstack/liquid-glass';

<LiquidGlassContainerView spacing={20}>
  <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
  <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
</LiquidGlassContainerView>
```

#### 4.2.2 Auto-adapting Text Color
```tsx
import { PlatformColor } from 'react-native';

<LiquidGlassView style={{ padding: 20, borderRadius: 20 }}>
  <Text style={{ color: PlatformColor('labelColor') }}>
    Auto-adapting Text
  </Text>
</LiquidGlassView>
```

### 4.3 Liquid Glass Patterns

#### 4.3.1 Card Glass
```tsx
// Standard card with liquid glass
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    margin: 8,
  }}
  effect="clear"
  interactive
>
  <Text>Card Content</Text>
</LiquidGlassView>
```

#### 4.3.2 Button Glass
```tsx
// Interactive button with glass effect
<LiquidGlassView
  style={{
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
  tintColor="rgba(0, 122, 255, 0.1)"
>
  <Text style={{ color: PlatformColor('labelColor') }}>Button</Text>
</LiquidGlassView>
```

#### 4.3.3 Modal Glass
```tsx
// Modal overlay with glass effect
<LiquidGlassView
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }}
  effect="clear"
>
  <LiquidGlassView
    style={{
      margin: 20,
      padding: 20,
      borderRadius: 20,
    }}
    effect="regular"
    interactive
  >
    <Text>Modal Content</Text>
  </LiquidGlassView>
</LiquidGlassView>
```

## 5. Layout System

### 5.1 Grid System

#### 5.1.1 Container
```css
/* Main container */
.max-w-md.mx-auto

/* Padding */
.p-4.pb-32

/* Minimum height */
.min-h-screen
```

#### 5.1.2 Spacing System
- **4px Grid**: All spacing is multiples of 4px
- **Default spacing**: `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)
- **Padding**: `p-3` (12px), `p-4` (16px), `p-6` (24px)

### 5.2 Component Layout

#### 5.2.1 Card Layout
```tsx
// Liquid glass card
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    margin: 8,
  }}
  effect="clear"
  interactive
>
  <Text>Card Content</Text>
</LiquidGlassView>
```

#### 5.2.2 Button Layout
```tsx
// Liquid glass button
<LiquidGlassView
  style={{
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
  tintColor="rgba(0, 122, 255, 0.1)"
>
  <Text style={{ color: PlatformColor('labelColor') }}>Button</Text>
</LiquidGlassView>
```

## 6. Component Design

### 6.1 Liquid Glass Button System

#### 6.1.1 Liquid Glass Button Variants
```tsx
// Primary button with liquid glass
<LiquidGlassView
  style={{
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
  tintColor="rgba(0, 122, 255, 0.1)"
>
  <Text style={{ color: PlatformColor('labelColor'), fontWeight: '600' }}>
    Primary Button
  </Text>
</LiquidGlassView>

// Secondary button with clear glass
<LiquidGlassView
  style={{
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="clear"
>
  <Text style={{ color: PlatformColor('labelColor') }}>Secondary Button</Text>
</LiquidGlassView>

// Icon button with liquid glass
<LiquidGlassView
  style={{
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
>
  <Icon name="plus" size={20} color={PlatformColor('labelColor')} />
</LiquidGlassView>
```

#### 6.1.2 Button Usage Examples
```tsx
// Primary action button
<LiquidGlassView
  style={buttonStyles.primary}
  interactive
  effect="regular"
  tintColor="rgba(0, 122, 255, 0.1)"
>
  <Text style={textStyles.buttonPrimary}>Add Routine</Text>
</LiquidGlassView>

// Secondary button
<LiquidGlassView
  style={buttonStyles.secondary}
  interactive
  effect="clear"
>
  <Text style={textStyles.buttonSecondary}>Cancel</Text>
</LiquidGlassView>

// Icon button
<LiquidGlassView
  style={buttonStyles.icon}
  interactive
  effect="regular"
>
  <Icon name="settings" size={20} color={PlatformColor('labelColor')} />
</LiquidGlassView>
```

### 6.2 Liquid Glass Card System

#### 6.2.1 Default Liquid Glass Card
```tsx
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    margin: 8,
  }}
  effect="clear"
  interactive
>
  <Text style={{ fontSize: 18, fontWeight: '600', color: PlatformColor('labelColor') }}>
    Card Title
  </Text>
  <Text style={{ fontSize: 14, color: PlatformColor('secondaryLabelColor'), marginTop: 4 }}>
    Card Description
  </Text>
  {/* Card Content */}
</LiquidGlassView>
```

#### 6.2.2 Special Liquid Glass Card Styles
```tsx
// Statistics card with liquid glass
<LiquidGlassView
  style={{
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  effect="regular"
  interactive
  tintColor="rgba(0, 122, 255, 0.05)"
>
  <Text style={{ fontSize: 24, fontWeight: 'bold', color: PlatformColor('labelColor') }}>
    75%
  </Text>
  <Text style={{ fontSize: 14, color: PlatformColor('secondaryLabelColor') }}>
    Completion Rate
  </Text>
</LiquidGlassView>

// Routine card with liquid glass
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    marginVertical: 4,
  }}
  effect="clear"
  interactive
>
  <Text style={{ fontSize: 16, fontWeight: '600', color: PlatformColor('labelColor') }}>
    Morning Routine
  </Text>
  <Text style={{ fontSize: 14, color: PlatformColor('secondaryLabelColor') }}>
    5 tasks completed
  </Text>
</LiquidGlassView>
```

### 6.3 Liquid Glass Dialog System

#### 6.3.1 Modal Styles with Liquid Glass
```tsx
// Modal overlay with liquid glass
<LiquidGlassView
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }}
  effect="clear"
>
  <LiquidGlassView
    style={{
      margin: 20,
      padding: 20,
      borderRadius: 20,
      maxWidth: 400,
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    }}
    effect="regular"
    interactive
  >
    <Text style={{ fontSize: 18, fontWeight: '600', color: PlatformColor('labelColor') }}>
      Modal Title
    </Text>
    <Text style={{ fontSize: 14, color: PlatformColor('secondaryLabelColor'), marginTop: 8 }}>
      Modal content goes here
    </Text>
  </LiquidGlassView>
</LiquidGlassView>
```

#### 6.3.2 Liquid Glass Animations
```tsx
// Animated liquid glass modal
const [isVisible, setIsVisible] = useState(false);

<Animated.View
  style={{
    opacity: isVisible ? 1 : 0,
    transform: [{ scale: isVisible ? 1 : 0.9 }],
  }}
>
  <LiquidGlassView
    style={{
      padding: 20,
      borderRadius: 20,
    }}
    effect="regular"
    interactive
  >
    <Text>Animated Content</Text>
  </LiquidGlassView>
</Animated.View>
```

## 7. Icon System

### 7.1 Icon Library
- **Expo Vector Icons**: Consistent icon set
- **Sizes**: 16px, 20px, 24px, 32px
- **Colors**: PlatformColor for automatic adaptation

### 7.2 Icon Usage Patterns with Liquid Glass

#### 7.2.1 Navigation Icons
```tsx
<LiquidGlassView
  style={{
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
>
  <Ionicons name="home" size={20} color={PlatformColor('labelColor')} />
</LiquidGlassView>
```

#### 7.2.2 Status Icons
```tsx
<LiquidGlassView
  style={{
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  effect="clear"
  tintColor="rgba(0, 122, 255, 0.1)"
>
  <Ionicons name="checkmark-circle" size={20} color={PlatformColor('systemBlue')} />
</LiquidGlassView>
```

#### 7.2.3 Action Icons
```tsx
<LiquidGlassView
  style={{
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
>
  <Ionicons name="add" size={20} color={PlatformColor('labelColor')} />
</LiquidGlassView>
```

## 8. Animation System

### 8.1 Liquid Glass Transition Effects

#### 8.1.1 Liquid Glass Transitions
```tsx
// Smooth liquid glass transition
const animatedValue = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
}, []);

<Animated.View
  style={{
    opacity: animatedValue,
    transform: [{ scale: animatedValue }],
  }}
>
  <LiquidGlassView
    style={{ padding: 20, borderRadius: 20 }}
    effect="regular"
    interactive
  >
    <Text>Animated Content</Text>
  </LiquidGlassView>
</Animated.View>
```

#### 8.1.2 Liquid Glass Component Animations
```tsx
// Interactive liquid glass with scale animation
const scaleValue = useRef(new Animated.Value(1)).current;

const handlePressIn = () => {
  Animated.spring(scaleValue, {
    toValue: 0.95,
    useNativeDriver: true,
  }).start();
};

const handlePressOut = () => {
  Animated.spring(scaleValue, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};

<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
  <LiquidGlassView
    style={{ padding: 20, borderRadius: 20 }}
    interactive
    effect="regular"
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}
  >
    <Text>Interactive Glass</Text>
  </LiquidGlassView>
</Animated.View>
```

### 8.2 Liquid Glass Interaction Animations

#### 8.2.1 Liquid Glass Button Feedback
```tsx
const [isAnimating, setIsAnimating] = useState(false);
const scaleValue = useRef(new Animated.Value(1)).current;

const handleToggle = () => {
  setIsAnimating(true);
  Animated.sequence([
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }),
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }),
  ]).start();
  setTimeout(() => setIsAnimating(false), 300);
  onToggle(routine.id);
};

<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
  <LiquidGlassView
    style={{ padding: 16, borderRadius: 16 }}
    interactive
    effect="regular"
    onPress={handleToggle}
  >
    <Text>Toggle Routine</Text>
  </LiquidGlassView>
</Animated.View>
```

#### 8.2.2 Liquid Glass Slider Animation
```tsx
const translateY = useRef(new Animated.Value(0)).current;

const getTransform = () => {
  if (direction === -1) {
    return translateY.setValue(100);
  } else if (direction === 1) {
    return translateY.setValue(-100);
  } else {
    return translateY.setValue(0);
  }
};

<Animated.View
  style={{
    transform: [{ translateY }],
  }}
>
  <LiquidGlassView
    style={{ padding: 20, borderRadius: 20 }}
    effect="clear"
    interactive
  >
    <Text>Slider Content</Text>
  </LiquidGlassView>
</Animated.View>
```

## 9. Responsive Design

### 9.1 Mobile-First Approach

#### 9.1.1 Liquid Glass Breakpoints
```tsx
// Responsive liquid glass container
const { width } = Dimensions.get('window');

<LiquidGlassView
  style={{
    width: width > 768 ? 400 : width - 32,
    padding: width > 768 ? 24 : 16,
    borderRadius: 20,
    alignSelf: 'center',
  }}
  effect="regular"
  interactive
>
  <Text>Responsive Content</Text>
</LiquidGlassView>
```

#### 9.1.2 Liquid Glass Container System
```tsx
// Main liquid glass container
<LiquidGlassView
  style={{
    flex: 1,
    padding: 16,
    paddingBottom: 128,
  }}
  effect="clear"
>
  {/* Main content */}
</LiquidGlassView>
```

### 9.2 Liquid Glass Touch Optimization

#### 9.2.1 Touch Targets with Liquid Glass
```tsx
// Minimum 44px touch target with liquid glass
<LiquidGlassView
  style={{
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
>
  <Ionicons name="menu" size={20} color={PlatformColor('labelColor')} />
</LiquidGlassView>
```

#### 9.2.2 Liquid Glass Gesture Support
```tsx
// Swipeable liquid glass card
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    marginVertical: 4,
  }}
  interactive
  effect="clear"
  onPress={handlePress}
  onLongPress={handleLongPress}
>
  <Text>Swipeable Content</Text>
</LiquidGlassView>
```

## 10. Accessibility Guidelines

### 10.1 Liquid Glass Color Contrast

#### 10.1.1 Liquid Glass WCAG Compliance
- **AA Level**: 4.5:1 or higher contrast ratio with liquid glass
- **AAA Level**: 7:1 or higher contrast ratio with liquid glass
- **Color testing**: Use automated tools with glass effects
- **PlatformColor**: Automatic adaptation for light/dark modes

#### 10.1.2 Liquid Glass Color Independence
```tsx
// Use PlatformColor for automatic adaptation
<LiquidGlassView
  style={{ padding: 16, borderRadius: 16 }}
  effect="regular"
  interactive
>
  <Text style={{ color: PlatformColor('labelColor') }}>
    Accessible Text
  </Text>
  <Ionicons 
    name="checkmark-circle" 
    size={20} 
    color={PlatformColor('systemGreen')} 
  />
</LiquidGlassView>
```

### 10.2 Liquid Glass Keyboard Navigation

#### 10.2.1 Focus Management with Liquid Glass
```tsx
// Accessible liquid glass button
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  interactive
  effect="regular"
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Toggle routine completion"
>
  <Ionicons name="checkmark-circle" size={20} color={PlatformColor('labelColor')} />
</LiquidGlassView>
```

#### 10.2.2 Liquid Glass Tab Order
```tsx
// Logical tab order with liquid glass
<LiquidGlassView
  style={{ padding: 16, borderRadius: 16 }}
  effect="clear"
  interactive
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Add new routine"
>
  <Text>Add Routine</Text>
</LiquidGlassView>
```

### 10.3 Liquid Glass Screen Reader Support

#### 10.3.1 Semantic Liquid Glass Components
```tsx
// Accessible liquid glass modal
<LiquidGlassView
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }}
  effect="clear"
  accessible={true}
  accessibilityRole="dialog"
  accessibilityLabel="Add Routine Dialog"
>
  <LiquidGlassView
    style={{
      margin: 20,
      padding: 20,
      borderRadius: 20,
    }}
    effect="regular"
    interactive
    accessible={true}
    accessibilityRole="dialog"
  >
    <Text style={{ fontSize: 18, fontWeight: '600', color: PlatformColor('labelColor') }}>
      Add Routine
    </Text>
    <Text style={{ fontSize: 14, color: PlatformColor('secondaryLabelColor') }}>
      Create a new daily routine
    </Text>
  </LiquidGlassView>
</LiquidGlassView>
```

#### 10.3.2 Liquid Glass ARIA Attributes
```tsx
// Accessible liquid glass form
<LiquidGlassView
  style={{ padding: 16, borderRadius: 16 }}
  effect="regular"
  accessible={true}
  accessibilityRole="form"
>
  <Text style={{ color: PlatformColor('labelColor') }}>Routine Name</Text>
  <TextInput
    style={{
      borderWidth: 1,
      borderColor: PlatformColor('separatorColor'),
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
      color: PlatformColor('labelColor'),
    }}
    placeholder="Enter routine name"
    accessibilityLabel="Routine name input"
  />
</LiquidGlassView>
```

## 11. Performance Optimization

### 11.1 Liquid Glass Rendering Optimization

#### 11.1.1 Liquid Glass Conditional Rendering
```tsx
{routines.length > 0 && (
  <LiquidGlassContainerView spacing={12}>
    {routines.map((routine) => (
      <LiquidGlassView
        key={routine.id}
        style={{ padding: 16, borderRadius: 16 }}
        effect="clear"
        interactive
      >
        <Text>{routine.name}</Text>
      </LiquidGlassView>
    ))}
  </LiquidGlassContainerView>
)}
```

#### 11.1.2 Liquid Glass Memoization
```tsx
const sortedRoutines = useMemo(() => {
  return [...routines].sort((a, b) => {
    // Sorting logic
  });
}, [routines]);

// Memoized liquid glass component
const LiquidGlassRoutineCard = memo(({ routine }) => (
  <LiquidGlassView
    style={{ padding: 16, borderRadius: 16 }}
    effect="clear"
    interactive
  >
    <Text>{routine.name}</Text>
  </LiquidGlassView>
));
```

### 11.2 Liquid Glass Animation Optimization

#### 11.2.1 GPU Acceleration with Liquid Glass
```tsx
// Use native driver for liquid glass animations
<Animated.View
  style={{
    transform: [{ translateY: animatedValue }],
  }}
>
  <LiquidGlassView
    style={{ padding: 20, borderRadius: 20 }}
    effect="regular"
    interactive
  >
    <Text>Optimized Glass</Text>
  </LiquidGlassView>
</Animated.View>
```

#### 11.2.2 Liquid Glass Frame Optimization
```tsx
// Optimized liquid glass transitions
const animatedValue = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true, // Use native driver
  }).start();
}, []);
```

## 12. Brand Guidelines

### 12.1 Liquid Glass Logo and Branding

#### 12.1.1 Liquid Glass App Title
```tsx
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 8,
  }}
  effect="clear"
>
  <Text style={{ 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: PlatformColor('labelColor') 
  }}>
    Daily Routines
  </Text>
</LiquidGlassView>
```

#### 12.1.2 Liquid Glass Date Display
```tsx
<LiquidGlassView
  style={{
    padding: 8,
    borderRadius: 12,
    alignSelf: 'center',
  }}
  effect="regular"
>
  <Text style={{ 
    fontSize: 12, 
    color: PlatformColor('secondaryLabelColor') 
  }}>
    {currentDate}
  </Text>
</LiquidGlassView>
```

### 12.2 Liquid Glass Tone and Manner

#### 12.2.1 Liquid Glass Message Tone
```tsx
// Success message with liquid glass
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  }}
  effect="regular"
  tintColor="rgba(0, 122, 255, 0.1)"
>
  <Text style={{ color: PlatformColor('systemBlue') }}>
    Routine added successfully
  </Text>
</LiquidGlassView>

// Progress message with liquid glass
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
  }}
  effect="clear"
>
  <Text style={{ color: PlatformColor('labelColor') }}>
    Today's progress 75%
  </Text>
</LiquidGlassView>
```

#### 12.2.2 Liquid Glass Error Messages
```tsx
// Error message with liquid glass
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  }}
  effect="regular"
  tintColor="rgba(255, 59, 48, 0.1)"
>
  <Text style={{ color: PlatformColor('systemRed') }}>
    Please enter a valid routine name
  </Text>
</LiquidGlassView>
```

## 13. Development Guidelines

### 13.1 Liquid Glass Component Structure

#### 13.1.1 Liquid Glass File Structure
```
src/
├── components/
│   ├── ui/                    # Basic UI components
│   │   ├── LiquidGlassCard.tsx
│   │   ├── LiquidGlassButton.tsx
│   │   └── LiquidGlassModal.tsx
│   ├── RoutineCard.tsx        # Liquid glass routine card
│   ├── RoutineStats.tsx       # Liquid glass stats
│   └── BottomNavigation.tsx   # Liquid glass navigation
├── pages/                     # Page components
├── contexts/                  # Contexts
├── lib/                       # Utilities
└── styles/                    # Liquid glass styles
    ├── liquidGlassStyles.ts
    └── colorSchemes.ts
```

#### 13.1.2 Liquid Glass Naming Conventions
- **Components**: PascalCase (LiquidGlassCard)
- **Files**: PascalCase.tsx
- **Functions**: camelCase (handleToggle)
- **Constants**: UPPER_SNAKE_CASE
- **Liquid Glass**: LiquidGlass prefix for glass components

### 13.2 Liquid Glass Styling Guidelines

#### 13.2.1 Liquid Glass Usage
```tsx
// Good example - Liquid glass with proper styling
<LiquidGlassView
  style={{
    padding: 16,
    borderRadius: 16,
    margin: 8,
  }}
  effect="clear"
  interactive
>
  <Text style={{ color: PlatformColor('labelColor') }}>
    Content
  </Text>
</LiquidGlassView>

// Bad example - Inline styles without liquid glass
<View style={{ 
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: 16,
  borderRadius: 16 
}}>
  <Text>Content</Text>
</View>
```

#### 13.2.2 Liquid Glass Conditional Styling
```tsx
// Liquid glass with conditional styling
<LiquidGlassView
  style={[
    {
      padding: 16,
      borderRadius: 16,
    },
    isActive && {
      backgroundColor: 'rgba(0, 122, 255, 0.1)',
    },
    isDisabled && {
      opacity: 0.5,
    }
  ]}
  effect={isActive ? "regular" : "clear"}
  interactive={!isDisabled}
>
  <Text style={{ color: PlatformColor('labelColor') }}>
    Conditional Content
  </Text>
</LiquidGlassView>
```

## 14. Testing Guidelines

### 14.1 Liquid Glass Visual Testing

#### 14.1.1 Liquid Glass Cross-Platform
- **iOS**: iOS 26+ for liquid glass effects
- **Android**: Fallback to regular glass effects
- **Web**: Fallback to CSS glass effects
- **Expo**: Test with Expo Go and development builds

#### 14.1.2 Liquid Glass Device Testing
- **iPhone**: 12, 13, 14, 15 series with iOS 26+
- **iPad**: iPad Pro with liquid glass support
- **Android**: Various resolutions with fallback
- **Simulator**: Test liquid glass in iOS Simulator

### 14.2 Liquid Glass Accessibility Testing

#### 14.2.1 Liquid Glass Automated Tools
- **React Native Testing Library**: Component testing
- **Accessibility Inspector**: iOS accessibility testing
- **Liquid Glass Fallback**: Test fallback behavior

#### 14.2.2 Liquid Glass Manual Testing
```tsx
// Test liquid glass accessibility
<LiquidGlassView
  style={{ padding: 16, borderRadius: 16 }}
  effect="regular"
  interactive
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Add routine"
  accessibilityHint="Double tap to add a new routine"
>
  <Text style={{ color: PlatformColor('labelColor') }}>
    Add Routine
  </Text>
</LiquidGlassView>
```

---

## 15. Liquid Glass Implementation Checklist

### 15.1 Pre-Implementation
- [ ] Verify iOS 26+ support for liquid glass effects
- [ ] Install @callstack/liquid-glass library
- [ ] Test isLiquidGlassSupported in development
- [ ] Plan fallback UI for unsupported devices

### 15.2 Implementation
- [ ] Use LiquidGlassView for all glass components
- [ ] Implement proper effect types (clear, regular, none)
- [ ] Add interactive prop for touch interactions
- [ ] Use PlatformColor for automatic color adaptation
- [ ] Test on both light and dark modes

### 15.3 Post-Implementation
- [ ] Test liquid glass effects on target devices
- [ ] Verify accessibility with screen readers
- [ ] Check performance with liquid glass animations
- [ ] Validate fallback behavior on unsupported devices

---

This design guide maintains a consistent liquid glass design system for the Apple Routine Flow app and provides clear standards for developers and designers to collaborate. All new features and components should be developed following these liquid glass guidelines.
