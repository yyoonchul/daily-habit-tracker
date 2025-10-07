# Apple Routine Flow - Design Guide

## 1. Design Philosophy

### 1.1 Core Principles
- **iOS-native experience**: Consistent UX based on Apple’s design language
- **Liquid Glass**: Premium visuals using iOS 26 liquid glass effects
- **Glassmorphism**: Modern visual hierarchy with translucency and blur
- **Minimalism**: Remove non-essential elements; focus on core tasks
- **Accessibility**: Inclusive design usable by everyone

### 1.2 Design Goals
- Intuitive interface with a low learning curve
- Balance aesthetics and functionality
- Consistent brand experience
- Mobile-first, responsive design

## 2. Color System

### 2.1 Base Color Palette

#### 2.1.1 Primary Colors
```css
/* iOS 블루 시스템 */
--ios-blue: 214 100% 59%;        /* 기본 블루 */
--ios-blue-light: 214 100% 65%;  /* 라이트 블루 */
--ios-blue-dark: 214 100% 53%;   /* 다크 블루 */
```

#### 2.1.2 Success Colors
```css
/* 성공/완료 색상 */
--success: 142 76% 36%;          /* 기본 그린 */
--success-light: 142 69% 58%;    /* 라이트 그린 */
```

#### 2.1.3 Surface Colors
```css
/* 카드/서피스 색상 */
--card-surface: 0 0% 100%;       /* 카드 배경 */
--card-hover: 0 0% 97%;          /* 카드 호버 */
--surface-secondary: 220 14% 96%; /* 보조 서피스 */
```

### 2.2 Text Hierarchy

#### 2.2.1 Light Mode
```css
--text-primary: 215 20% 15%;     /* 기본 텍스트 */
--text-secondary: 215 16% 47%;  /* 보조 텍스트 */
--text-tertiary: 215 12% 63%;    /* 3차 텍스트 */
```

#### 2.2.2 Dark Mode
```css
--text-primary: 0 0% 98%;        /* 기본 텍스트 */
--text-secondary: 215 10% 70%;   /* 보조 텍스트 */
--text-tertiary: 215 10% 55%;    /* 3차 텍스트 */
```

### 2.3 Theming Color System

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

#### 2.3.2 Dynamic Color Derivatives
- **Light variant**: base lightness + 6%
- **Dark variant**: base lightness - 6%
- **Live application**: instantly applied via CSS variables

## 3. Typography

### 3.1 Font Hierarchy

#### 3.1.1 Title Hierarchy
```css
/* 메인 타이틀 */
.text-2xl.font-bold.text-text-primary

/* 섹션 타이틀 */
.text-xl.font-bold.text-text-primary

/* 카드 타이틀 */
.text-lg.font-semibold.text-text-primary
```

#### 3.1.2 Body Text
```css
/* 기본 본문 */
.text-base.font-medium.text-text-primary

/* 보조 텍스트 */
.text-sm.text-text-secondary

/* 작은 텍스트 */
.text-xs.text-text-tertiary
```

### 3.2 Text Styling

#### 3.2.1 Weights
- **Bold**: `font-bold` - titles/emphasis
- **Semibold**: `font-semibold` - subtitles
- **Medium**: `font-medium` - body
- **Regular**: default weight

#### 3.2.2 Sizes
- **2xl**: 24px - main title
- **xl**: 20px - section title
- **lg**: 18px - card title
- **base**: 16px - body
- **sm**: 14px - secondary text
- **xs**: 12px - small text

## 4. Liquid Glass 디자인 시스템

### 4.0 라이브러리, 설치 및 API

본 프로젝트의 리퀴드 글래스 구현은 공식 라이브러리 `@callstack/liquid-glass`를 표준으로 사용합니다.

- iOS 26 리퀴드 글래스 시각 효과 제공
- 틴트(`tintColor`) 사용자 지정
- 효과 모드: `clear`, `regular` (및 `none` 폴백)

#### 설치

```bash
npm install @callstack/liquid-glass
# or
yarn add @callstack/liquid-glass
```

> 경고
> - Xcode 26 이상으로 컴파일해야 합니다.
> - React Native 0.80 이상이 필요합니다.

#### 기본 사용 예시

```tsx
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported,
} from '@callstack/liquid-glass';

function MyComponent() {
  return (
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
  );
}

// 여러 글래스 요소 병합
function MergingGlassElements() {
  return (
    <LiquidGlassContainerView spacing={20}>
      <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
      <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
    </LiquidGlassContainerView>
  );
}
```

배경에 따라 텍스트 색상을 자동으로 조정하려면 `react-native`의 `PlatformColor`를 사용합니다.

> 참고
> 글래스 뷰의 높이가 65 이상이면 자동 색상 적응이 되지 않을 수 있습니다.

```tsx
import { PlatformColor } from 'react-native';
import { LiquidGlassView } from '@callstack/liquid-glass';

function MyComponent() {
  return (
    <LiquidGlassView style={{ padding: 20, borderRadius: 20 }}>
      <Text style={{ color: PlatformColor('labelColor') }}>Hello World</Text>
    </LiquidGlassView>
  );
}
```

> 참고
> iOS 26 미만 등 미지원 환경에서는 효과 없이 일반 `View`로 렌더링됩니다.

#### API

`isLiquidGlassSupported`: 현재 디바이스가 리퀴드 글래스를 지원하는지 나타내는 불리언 상수

```tsx
import { isLiquidGlassSupported } from '@callstack/liquid-glass';

if (isLiquidGlassSupported) {
  // 지원됨
} else {
  // 폴백 UI 제공
}
```

LiquidGlassView - Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `interactive` | `boolean` | `false` | 터치 상호작용 효과 활성화 |
| `effect` | `'clear' | 'regular' | 'none'` | `'regular'` | 시각 효과 모드. `clear`: 더 투명, `regular`: 표준 블러, `none`: 효과 없음. 값 변경 시 머티리얼라이즈/디머티리얼라이즈 애니메이션 적용 |
| `tintColor` | `ColorValue` | `undefined` | 글래스 위에 적용되는 오버레이 색상 |
| `colorScheme` | `'light' | 'dark' | 'system'` | `'system'` | 색상 스킴 적응: 라이트/다크/시스템 연동 |

LiquidGlassContainerView - Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `spacing` | `number` | `0` | 자식 요소 간 거리가 해당 값 이하일 때 글래스 효과가 합쳐지는 거리 |

#### 알려진 이슈

- `interactive` prop은 마운트 시점에만 적용되며 런타임 변경이 반영되지 않습니다.

### 4.1 Liquid Glass 컴포넌트 (라이브러리 기반 표준)

#### 4.1.1 LiquidGlassView
```tsx
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

// 기본 리퀴드 글래스 뷰 (폴백은 배경만 적용)
<LiquidGlassView
  style={[
    { width: 200, height: 100, borderRadius: 20 },
    !isLiquidGlassSupported && { backgroundColor: 'rgba(255,255,255,0.5)' },
  ]}
  interactive
  effect="clear"
>
  <Text>Hello World</Text>
  {/* iOS 26 미만 및 기타 플랫폼에서는 시각 효과 없이 일반 View 처럼 보입니다. */}
</LiquidGlassView>
```

#### 4.1.2 Liquid Glass 효과
```tsx
// Clear 효과 - 더 투명함
<LiquidGlassView effect="clear" />

// Regular 효과 - 표준 글래스 블러
<LiquidGlassView effect="regular" />

// 효과 없음 - 투명 뷰
<LiquidGlassView effect="none" />
```

#### 4.1.3 인터랙티브 글래스
```tsx
// 터치 효과가 있는 인터랙티브 글래스
<LiquidGlassView
  interactive
  effect="clear"
  tintColor="rgba(0, 122, 255, 0.1)"
  colorScheme="system"
>
  <Text>Interactive Glass</Text>
</LiquidGlassView>
```

### 4.2 Liquid Glass 컨테이너

#### 4.2.1 글래스 요소 병합
```tsx
import { LiquidGlassContainerView } from '@callstack/liquid-glass';

<LiquidGlassContainerView spacing={20}>
  <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
  <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
</LiquidGlassContainerView>
```

#### 4.2.2 자동 텍스트 색상 적응
```tsx
import { PlatformColor } from 'react-native';

<LiquidGlassView style={{ padding: 20, borderRadius: 20 }}>
  <Text style={{ color: PlatformColor('labelColor') }}>
    Auto-adapting Text
  </Text>
</LiquidGlassView>
```

### 4.3 Liquid Glass 패턴

#### 4.3.1 카드 글래스
```tsx
// 리퀴드 글래스가 적용된 표준 카드
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

#### 4.3.2 버튼 글래스
```tsx
// 글래스 효과가 있는 인터랙티브 버튼
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

#### 4.3.3 모달 글래스
```tsx
// 글래스 효과가 있는 모달 오버레이 (라이브러리 사용)
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

## 5. 레이아웃 시스템

### 5.1 그리드 시스템

#### 5.1.1 컨테이너
```css
/* 메인 컨테이너 */
.max-w-md.mx-auto

/* 패딩 */
.p-4.pb-32

/* 최소 높이 */
.min-h-screen
```

#### 5.1.2 간격 시스템
- **4px 그리드**: 모든 간격은 4px 배수
- **기본 간격**: `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)
- **패딩**: `p-3` (12px), `p-4` (16px), `p-6` (24px)

### 5.2 컴포넌트 레이아웃

#### 5.2.1 카드 레이아웃
```tsx
// 리퀴드 글래스 카드
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

#### 5.2.2 버튼 레이아웃
```tsx
// 리퀴드 글래스 버튼
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

## 6. 컴포넌트 디자인

### 6.1 Liquid Glass 버튼 시스템

#### 6.1.1 Liquid Glass 버튼 변형
```tsx
// 프라이머리 버튼 (Liquid Glass)
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

// 세컨더리 버튼 (Clear Glass)
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

// 아이콘 버튼
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

#### 6.1.2 버튼 사용 예시
```tsx
// 주요 액션 버튼
<LiquidGlassView
  style={buttonStyles.primary}
  interactive
  effect="regular"
  tintColor="rgba(0, 122, 255, 0.1)"
>
  <Text style={textStyles.buttonPrimary}>Add Routine</Text>
</LiquidGlassView>

// 보조 버튼
<LiquidGlassView
  style={buttonStyles.secondary}
  interactive
  effect="clear"
>
  <Text style={textStyles.buttonSecondary}>Cancel</Text>
</LiquidGlassView>

// 아이콘 버튼
<LiquidGlassView
  style={buttonStyles.icon}
  interactive
  effect="regular"
>
  <Icon name="settings" size={20} color={PlatformColor('labelColor')} />
</LiquidGlassView>
```

### 6.2 Liquid Glass 카드 시스템

#### 6.2.1 기본 Liquid Glass 카드
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

#### 6.2.2 특수 Liquid Glass 카드 스타일
```tsx
// 통계 카드
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

// 루틴 카드
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

### 6.3 Liquid Glass 다이얼로그 시스템

#### 6.3.1 Liquid Glass 모달 스타일
```tsx
// 리퀴드 글래스 모달 오버레이
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

#### 6.3.2 Liquid Glass 애니메이션
```tsx
// 애니메이션이 있는 리퀴드 글래스 모달
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

## 7. 아이콘 시스템

### 7.1 아이콘 라이브러리
- **Expo Vector Icons**: 일관된 아이콘 세트
- **크기**: 16px, 20px, 24px, 32px
- **색상**: PlatformColor로 자동 적응

### 7.2 Liquid Glass 아이콘 사용 패턴

#### 7.2.1 내비게이션 아이콘
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

#### 7.2.2 상태 아이콘
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

#### 7.2.3 액션 아이콘
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

## 8. 애니메이션 시스템

### 8.1 Liquid Glass 전환 효과

#### 8.1.1 Liquid Glass 트랜지션
```tsx
// 부드러운 리퀴드 글래스 트랜지션
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

#### 8.1.2 Liquid Glass 컴포넌트 애니메이션
```tsx
// 스케일 애니메이션이 있는 인터랙티브 글래스
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

### 8.2 Liquid Glass 인터랙션 애니메이션

#### 8.2.1 Liquid Glass 버튼 피드백
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

#### 8.2.2 Liquid Glass 슬라이더 애니메이션
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

## 9. 반응형 디자인

### 9.1 모바일 우선 접근법

#### 9.1.1 Liquid Glass 브레이크포인트
```tsx
// 반응형 리퀴드 글래스 컨테이너
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

#### 9.1.2 Liquid Glass 컨테이너 시스템
```tsx
// 메인 리퀴드 글래스 컨테이너
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

### 9.2 Liquid Glass 터치 최적화

#### 9.2.1 Liquid Glass 터치 타깃
```tsx
// 최소 44px 터치 타깃
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

#### 9.2.2 Liquid Glass 제스처 지원
```tsx
// 스와이프 가능한 리퀴드 글래스 카드
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

## 10. 접근성 가이드라인

### 10.1 Liquid Glass 색 대비

#### 10.1.1 Liquid Glass WCAG 준수
- **AA 레벨**: 리퀴드 글래스와 함께 대비비 4.5:1 이상
- **AAA 레벨**: 리퀴드 글래스와 함께 대비비 7:1 이상
- **색상 테스트**: 글래스 효과를 포함한 자동화 도구 사용
- **PlatformColor**: 라이트/다크 모드 자동 적응

#### 10.1.2 Liquid Glass 색상 독립성
```tsx
// 자동 적응을 위한 PlatformColor 사용
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

### 10.2 Liquid Glass 키보드 내비게이션

#### 10.2.1 Liquid Glass 포커스 관리
```tsx
// 접근 가능한 리퀴드 글래스 버튼
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

#### 10.2.2 Liquid Glass 탭 순서
```tsx
// 논리적인 탭 순서
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

### 10.3 Liquid Glass 스크린리더 지원

#### 10.3.1 시맨틱 Liquid Glass 컴포넌트
```tsx
// 접근 가능한 리퀴드 글래스 모달
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

#### 10.3.2 Liquid Glass ARIA 속성
```tsx
// 접근 가능한 리퀴드 글래스 폼
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

## 11. 성능 최적화

### 11.1 Liquid Glass 렌더링 최적화

#### 11.1.1 Liquid Glass 조건부 렌더링
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

#### 11.1.2 Liquid Glass 메모이제이션
```tsx
const sortedRoutines = useMemo(() => {
  return [...routines].sort((a, b) => {
    // Sorting logic
  });
}, [routines]);

// 메모이제이션된 리퀴드 글래스 컴포넌트
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

### 11.2 Liquid Glass 애니메이션 최적화

#### 11.2.1 Liquid Glass GPU 가속
```tsx
// 네이티브 드라이버 사용
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

#### 11.2.2 Liquid Glass 프레임 최적화
```tsx
// 최적화된 리퀴드 글래스 전환
const animatedValue = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true, // 네이티브 드라이버 사용
  }).start();
}, []);
```

## 12. 브랜드 가이드라인

### 12.1 Liquid Glass 로고 및 브랜딩

#### 12.1.1 Liquid Glass 앱 타이틀
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

#### 12.1.2 Liquid Glass 날짜 표시
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

### 12.2 Liquid Glass 톤 & 매너

#### 12.2.1 Liquid Glass 메시지 톤
```tsx
// 성공 메시지
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

// 진행 메시지
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

#### 12.2.2 Liquid Glass 에러 메시지
```tsx
// 에러 메시지
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

## 13. 개발 가이드라인

### 13.1 Liquid Glass 컴포넌트 구조

#### 13.1.1 Liquid Glass 파일 구조
```
src/
├── components/
│   ├── ui/                    # 기본 UI 컴포넌트
│   │   ├── LiquidGlassCard.tsx
│   │   ├── LiquidGlassButton.tsx
│   │   └── LiquidGlassModal.tsx
│   ├── RoutineCard.tsx        # Liquid glass 루틴 카드
│   ├── RoutineStats.tsx       # Liquid glass 통계
│   └── BottomNavigation.tsx   # Liquid glass 내비게이션
├── pages/                     # 페이지 컴포넌트
├── contexts/                  # 컨텍스트
├── lib/                       # 유틸리티
└── styles/                    # Liquid glass 스타일
    ├── liquidGlassStyles.ts
    └── colorSchemes.ts
```

#### 13.1.2 Liquid Glass 네이밍 컨벤션
- **컴포넌트**: PascalCase (LiquidGlassCard)
- **파일**: PascalCase.tsx
- **함수**: camelCase (handleToggle)
- **상수**: UPPER_SNAKE_CASE
- **Liquid Glass**: 글래스 컴포넌트는 LiquidGlass 접두사 사용

### 13.2 Liquid Glass 스타일 가이드라인

#### 13.2.1 Liquid Glass 사용
```tsx
// 올바른 예시 - 적절한 스타일의 리퀴드 글래스
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

```

#### 13.2.2 Liquid Glass 조건부 스타일링
```tsx
// 조건부 스타일이 적용된 리퀴드 글래스
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

## 14. 테스트 가이드라인

### 14.1 Liquid Glass 시각 테스트

#### 14.1.1 Liquid Glass 크로스플랫폼
- **iOS**: iOS 26+에서 `@callstack/liquid-glass` 효과 활성 (표준)
- **Android**: 효과 미지원 — 라이브러리 없이 일반 UI로 표시 (대체 구현 금지)
- **Web**: 효과 미지원 — CSS 기반 대체 글래스 구현 지양, 일반 UI로 표시
- **Expo**: Expo Go/개발 빌드로 동작 확인, 실제 효과는 dev/client 또는 아카이브 빌드에서 검증

#### 14.1.2 Liquid Glass 디바이스 테스트
- **iPhone**: iOS 26+의 12, 13, 14, 15 시리즈
- **iPad**: 리퀴드 글래스 지원 iPad Pro
- **Android**: 다양한 해상도, 폴백 동작 확인
- **시뮬레이터**: iOS 시뮬레이터에서 리퀴드 글래스 테스트

### 14.2 Liquid Glass 접근성 테스트

#### 14.2.1 Liquid Glass 자동화 도구
- **React Native Testing Library**: 컴포넌트 테스트
- **Accessibility Inspector**: iOS 접근성 테스트
- **Liquid Glass Fallback**: 폴백 동작 테스트

#### 14.2.2 Liquid Glass 수동 테스트
```tsx
// 리퀴드 글래스 접근성 테스트
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

## 15. Liquid Glass 구현 체크리스트

### 15.1 사전 준비
- [ ] iOS 26+에서 리퀴드 글래스 효과 지원 확인
- [ ] @callstack/liquid-glass 라이브러리 설치
- [ ] 개발 환경에서 isLiquidGlassSupported 테스트
- [ ] 미지원 기기용 폴백 UI 설계

### 15.2 구현
- [ ] 모든 글래스 컴포넌트에 LiquidGlassView 사용
- [ ] 올바른 효과 타입 적용 (clear, regular, none)
- [ ] 터치 인터랙션을 위한 interactive prop 추가
- [ ] PlatformColor 사용으로 자동 색상 적응
- [ ] 라이트/다크 모드 모두 테스트

### 15.3 구현 이후
- [ ] 대상 기기에서 리퀴드 글래스 효과 테스트
- [ ] 스크린리더 접근성 검증
- [ ] 글래스 애니메이션 성능 확인
- [ ] 미지원 기기에서 폴백 동작 검증

---

## 16. Pre-built Components Library

### 16.1 Base UI Components

These components are ready to use and follow the Liquid Glass design system.

#### 16.1.1 LiquidGlassCard

```tsx
import { LiquidGlassCard } from '@/components/ui';

// Basic card
<LiquidGlassCard>
  <Text>Card content</Text>
</LiquidGlassCard>

// Interactive card with press handler
<LiquidGlassCard 
  interactive 
  onPress={() => console.log('pressed')}
>
  <Text>Pressable card</Text>
</LiquidGlassCard>

// Card with custom effect
<LiquidGlassCard effect="regular" style={{ padding: 24 }}>
  <Text>Regular glass effect</Text>
</LiquidGlassCard>
```

**Props:**
- `children`: React.ReactNode
- `interactive?: boolean` - Enable touch interaction
- `effect?: 'clear' | 'regular' | 'none'` - Glass effect type (default: 'clear')
- `style?: ViewStyle` - Custom styles
- `onPress?: () => void` - Press handler

#### 16.1.2 LiquidGlassButton

```tsx
import { LiquidGlassButton } from '@/components/ui';

// Primary button
<LiquidGlassButton 
  variant="primary" 
  onPress={() => console.log('pressed')}
>
  Add Routine
</LiquidGlassButton>

// Secondary button
<LiquidGlassButton variant="secondary">
  Cancel
</LiquidGlassButton>

// Ghost button
<LiquidGlassButton variant="ghost">
  Skip
</LiquidGlassButton>

// Button sizes
<LiquidGlassButton size="small">Small</LiquidGlassButton>
<LiquidGlassButton size="medium">Medium</LiquidGlassButton>
<LiquidGlassButton size="large">Large</LiquidGlassButton>

// Disabled button
<LiquidGlassButton disabled>
  Disabled
</LiquidGlassButton>
```

**Props:**
- `children`: React.ReactNode
- `onPress?: () => void`
- `variant?: 'primary' | 'secondary' | 'ghost'` (default: 'primary')
- `size?: 'small' | 'medium' | 'large'` (default: 'medium')
- `disabled?: boolean`
- `style?: ViewStyle`
- `textStyle?: TextStyle`

#### 16.1.3 LiquidGlassIconButton

```tsx
import { LiquidGlassIconButton } from '@/components/ui';

// Basic icon button
<LiquidGlassIconButton 
  icon="add" 
  onPress={() => console.log('add')} 
/>

// Custom size and color
<LiquidGlassIconButton 
  icon="settings-outline" 
  size={24}
  color={PlatformColor('systemBlue')}
  onPress={() => {}}
/>

// Disabled state
<LiquidGlassIconButton 
  icon="trash-outline" 
  disabled 
/>
```

**Props:**
- `icon`: Ionicons icon name
- `onPress?: () => void`
- `size?: number` (default: 20)
- `color?: string` (default: PlatformColor('labelColor'))
- `style?: ViewStyle`
- `disabled?: boolean`

#### 16.1.4 LiquidGlassModal

```tsx
import { LiquidGlassModal } from '@/components/ui';
import { useState } from 'react';

function MyComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <LiquidGlassButton onPress={() => setVisible(true)}>
        Open Modal
      </LiquidGlassButton>

      <LiquidGlassModal 
        visible={visible} 
        onClose={() => setVisible(false)}
      >
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Modal Title
        </Text>
        <Text style={{ marginTop: 8 }}>
          Modal content goes here
        </Text>
        <LiquidGlassButton onPress={() => setVisible(false)}>
          Close
        </LiquidGlassButton>
      </LiquidGlassModal>
    </>
  );
}
```

**Props:**
- `visible: boolean` - Modal visibility
- `onClose: () => void` - Close handler
- `children`: React.ReactNode
- `style?: ViewStyle`

### 16.2 Feature Components

#### 16.2.1 RoutineCard

```tsx
import { RoutineCard } from '@/components';
import { Routine } from '@/types';

const routine: Routine = {
  id: '1',
  title: 'Morning Exercise',
  scheduledTime: '07:00',
  frequency: 'daily',
  completedToday: false,
  streak: 5,
  monthlySuccessRate: 85,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Display-only card
<RoutineCard routine={routine} />

// Interactive card with toggle
<RoutineCard 
  routine={routine}
  onToggle={(id) => console.log('toggle', id)}
/>

// Management card with actions
<RoutineCard 
  routine={routine}
  showActions
  onEdit={(routine) => console.log('edit', routine)}
  onDelete={(id) => console.log('delete', id)}
/>
```

**Props:**
- `routine: Routine` - Routine data
- `onToggle?: (id: string) => void` - Toggle completion handler
- `onEdit?: (routine: Routine) => void` - Edit handler
- `onDelete?: (id: string) => void` - Delete handler
- `showActions?: boolean` - Show edit/delete buttons (default: false)

#### 16.2.2 RoutineStats

```tsx
import { RoutineStats } from '@/components';
import { Routine } from '@/types';

const routines: Routine[] = [
  // ... routine data
];

<RoutineStats routines={routines} />
```

**Props:**
- `routines: Routine[]` - Array of routines

**Displays:**
- Today's completion count (completed/total)
- Progress bar with percentage
- Large percentage display

### 16.3 Navigation Components

#### 16.3.1 BottomNavigation

```tsx
import { BottomNavigation } from '@/components';

// In your layout file
export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Your content */}
      <BottomNavigation />
    </View>
  );
}
```

**Features:**
- Auto-detects active route
- Liquid Glass effect
- 4 tabs: Home, Analytics, Manage, Settings
- iOS-style icon states (outline/filled)

#### 16.3.2 MainHeader

```tsx
import { MainHeader } from '@/components';

// Simple header
<MainHeader title="Daily Routines" />

// Header with subtitle
<MainHeader 
  title="Daily Routines" 
  subtitle="Track your habits"
/>
```

**Props:**
- `title: string` - Header title
- `subtitle?: string` - Optional subtitle

### 16.4 Complete Usage Example

```tsx
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  MainHeader,
  RoutineStats,
  RoutineCard,
  LiquidGlassButton,
  LiquidGlassIconButton,
  LiquidGlassModal,
  BottomNavigation,
} from '@/components';
import { Routine } from '@/types';

export default function HomeScreen() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (id: string) => {
    setRoutines(prev =>
      prev.map(r =>
        r.id === id ? { ...r, completedToday: !r.completedToday } : r
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <MainHeader 
          title="Daily Routines" 
          subtitle="Keep your habits on track"
        />

        <RoutineStats routines={routines} />

        <View style={styles.header}>
          <LiquidGlassButton onPress={() => setShowModal(true)}>
            Add Routine
          </LiquidGlassButton>
          <LiquidGlassIconButton 
            icon="settings-outline" 
            onPress={() => {}}
          />
        </View>

        {routines.map(routine => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onToggle={handleToggle}
          />
        ))}
      </ScrollView>

      <LiquidGlassModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        {/* Add routine form */}
      </LiquidGlassModal>

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
});
```

### 16.5 Import Paths

All components can be imported from a single index:

```tsx
// Import all at once
import {
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidGlassIconButton,
  LiquidGlassModal,
  RoutineCard,
  RoutineStats,
  BottomNavigation,
  MainHeader,
} from '@/components';

// Or import individually
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
import { RoutineCard } from '@/components/RoutineCard';
```

### 16.6 TypeScript Support

All components are fully typed with TypeScript:

```tsx
import type { Routine } from '@/types';

// Type-safe props
const routine: Routine = {
  id: '1',
  title: 'Exercise',
  // ... all required fields
};

// Autocomplete works for all props
<RoutineCard 
  routine={routine}
  onToggle={(id) => {}} // id is typed as string
  onEdit={(routine) => {}} // routine is typed as Routine
/>
```

---

이 디자인 가이드는 Apple Routine Flow 앱을 위한 일관된 리퀴드 글래스 디자인 시스템을 유지하고, 개발자와 디자이너가 협업할 수 있는 명확한 기준을 제공합니다. 모든 신규 기능과 컴포넌트는 본 가이드라인을 따라 개발되어야 합니다.
