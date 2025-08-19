# 🔄 Tooli v1.4.0 Refactoring Plan

## 📋 Overview

This document outlines the comprehensive refactoring plan for Tooli v1.4.0, focusing on design system implementation, code quality improvements, and architectural enhancements.

## 🎯 Refactoring Goals

### Primary Objectives

1. **Design System Implementation** - Replace hardcoded colors with CSS variables
2. **Component Library Enhancement** - Standardize and improve reusable components
3. **Code Quality Improvements** - Address technical debt and improve maintainability
4. **Performance Optimization** - Further optimize build and runtime performance
5. **Accessibility Enhancement** - Improve WCAG compliance

## 🎨 Design System Refactoring

### Current Issues Identified

#### 1. Hardcoded Colors

**Files Affected:**

- `libs/user-management/src/lib/user-management.ts` - Line 35-50
- `libs/user-management/src/lib/user-manager.ts` - Line 35-50
- `apps/tooli/src/components/wheel/WheelCanvas.tsx` - Line 25-40
- `apps/tooli/src/app/page.module.css` - Multiple hardcoded colors

**Problem:** Colors are hardcoded throughout the codebase, making theming difficult and inconsistent.

**Solution:** Implement CSS custom properties (design tokens) for all colors.

#### 2. Inconsistent Styling

**Files Affected:**

- `apps/tooli/src/components/Navigation.tsx` - Inline styles
- `apps/tooli/src/app/page.tsx` - Mixed styling approaches
- `apps/tooli/src/app/about/page.tsx` - Inline styles

**Problem:** Mix of inline styles, CSS modules, and CSS variables creates inconsistency.

**Solution:** Standardize on CSS variables and component-based styling.

### Implementation Plan

#### Phase 1: Design Tokens (Week 1)

```css
/* Design System Variables */
:root {
  /* Color Palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;

  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-500: #6b7280;
  --color-gray-900: #111827;

  /* Wheel Colors */
  --wheel-color-1: #ff6b6b;
  --wheel-color-2: #4ecdc4;
  --wheel-color-3: #45b7d1;
  --wheel-color-4: #96ceb4;
  --wheel-color-5: #ffeaa7;
  --wheel-color-6: #dda0dd;
  --wheel-color-7: #98d8c8;
  --wheel-color-8: #f7dc6f;
  --wheel-color-9: #bb8fce;
  --wheel-color-10: #85c1e9;
  --wheel-color-11: #f8c471;
  --wheel-color-12: #82e0aa;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

#### Phase 2: Component Library (Week 2)

**New Components to Create:**

- `components/ui/ColorPalette.tsx` - Color system documentation
- `components/ui/Spacing.tsx` - Spacing system documentation
- `components/ui/Typography.tsx` - Typography system documentation
- `components/ui/ThemeProvider.tsx` - Enhanced theme provider

#### Phase 3: Migration (Week 3)

**Files to Refactor:**

1. `libs/user-management/src/lib/user-management.ts`
2. `libs/user-management/src/lib/user-manager.ts`
3. `apps/tooli/src/components/wheel/WheelCanvas.tsx`
4. `apps/tooli/src/components/Navigation.tsx`
5. `apps/tooli/src/app/page.tsx`
6. `apps/tooli/src/app/about/page.tsx`

## 🔧 Code Quality Improvements

### 1. TypeScript Enhancements

#### Current Issues:

- Some `any` types still present
- Missing type definitions for some components
- Inconsistent interface naming

#### Improvements:

```typescript
// Before
const handleError = (error: any) => {
  console.error(error);
};

// After
interface ApiError {
  message: string;
  code: string;
  status: number;
}

const handleError = (error: ApiError) => {
  console.error(`Error ${error.code}: ${error.message}`);
};
```

### 2. Component Standardization

#### Current Issues:

- Inconsistent prop interfaces
- Mixed styling approaches
- Varying component patterns

#### Improvements:

```typescript
// Standardized Component Interface
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

interface ButtonProps extends BaseComponentProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}
```

### 3. Error Handling

#### Current Issues:

- Inconsistent error handling patterns
- Missing error boundaries
- Poor error messages

#### Improvements:

```typescript
// Error Boundary Component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## 🚀 Performance Optimizations

### 1. Bundle Size Optimization

#### Current Issues:

- Large bundle sizes
- Unused dependencies
- Inefficient imports

#### Improvements:

```typescript
// Tree-shaking friendly imports
import { Button } from '@heroui/react/button';
import { Card } from '@heroui/react/card';

// Instead of
import { Button, Card } from '@heroui/react';
```

### 2. Component Optimization

#### Current Issues:

- Unnecessary re-renders
- Missing React.memo
- Inefficient state management

#### Improvements:

```typescript
// Optimized Component
const OptimizedWheel = React.memo<WheelProps>(({ segments, onSpin }) => {
  const memoizedSegments = useMemo(() => segments, [segments]);

  return <WheelCanvas segments={memoizedSegments} onSpin={onSpin} />;
});
```

### 3. Caching Strategy

#### Current Issues:

- Missing cache headers
- Inefficient data fetching
- No service worker

#### Improvements:

```typescript
// Service Worker Implementation
const CACHE_NAME = 'tooli-v1.4.0';
const urlsToCache = ['/', '/static/js/bundle.js', '/static/css/main.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});
```

## ♿ Accessibility Improvements

### 1. WCAG Compliance

#### Current Issues:

- Missing ARIA labels
- Poor keyboard navigation
- Insufficient color contrast

#### Improvements:

```typescript
// Accessible Button Component
const AccessibleButton: React.FC<ButtonProps> = ({ children, 'aria-label': ariaLabel, ...props }) => (
  <button
    {...props}
    aria-label={ariaLabel}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        props.onClick?.();
      }
    }}
  >
    {children}
  </button>
);
```

### 2. Screen Reader Support

#### Improvements:

```typescript
// Screen Reader Announcements
const useScreenReader = () => {
  const announce = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return { announce };
};
```

## 📊 Testing Enhancements

### 1. Test Coverage

#### Current Issues:

- Incomplete test coverage
- Missing integration tests
- No visual regression tests

#### Improvements:

```typescript
// Comprehensive Test Suite
describe('Wheel Component', () => {
  it('should render with correct segments', () => {
    const segments = [
      { id: '1', name: 'User 1', probability: 0.5 },
      { id: '2', name: 'User 2', probability: 0.5 },
    ];

    render(<Wheel segments={segments} />);

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('should handle spin animation correctly', async () => {
    const onSpin = jest.fn();
    render(<Wheel onSpin={onSpin} />);

    fireEvent.click(screen.getByRole('button', { name: /spin/i }));

    expect(onSpin).toHaveBeenCalled();
  });
});
```

### 2. Visual Regression Testing

#### Implementation:

```typescript
// Visual Regression Test
describe('Visual Regression', () => {
  it('should match wheel snapshot', () => {
    const segments = generateTestSegments();

    const { container } = render(<Wheel segments={segments} />);

    expect(container).toMatchSnapshot();
  });
});
```

## 🔄 Migration Strategy

### Phase 1: Foundation (Week 1)

- [ ] Implement design tokens
- [ ] Create base component library
- [ ] Set up testing infrastructure

### Phase 2: Core Components (Week 2)

- [ ] Refactor wheel components
- [ ] Update navigation component
- [ ] Migrate page components

### Phase 3: Libraries (Week 3)

- [ ] Update user-management library
- [ ] Refactor wheel-engine library
- [ ] Standardize shared-ui library

### Phase 4: Testing & Validation (Week 4)

- [ ] Comprehensive testing
- [ ] Performance validation
- [ ] Accessibility audit

## 📈 Success Metrics

### Performance Targets

- **Bundle Size**: Reduce by 20%
- **Build Time**: Maintain < 1s for libs
- **Test Coverage**: Achieve 90%+
- **Lighthouse Score**: 95+ across all metrics

### Quality Targets

- **TypeScript**: 100% strict mode compliance
- **ESLint**: 0 warnings/errors
- **Accessibility**: WCAG 2.1 AA compliance
- **Code Coverage**: 90%+ test coverage

### User Experience Targets

- **Load Time**: < 2s initial load
- **Interaction**: < 100ms response time
- **Accessibility**: 100% keyboard navigation
- **Mobile**: 100% responsive design

## 🛠️ Implementation Checklist

### Design System

- [ ] Create design tokens CSS file
- [ ] Implement color palette system
- [ ] Create spacing and typography systems
- [ ] Build component documentation
- [ ] Migrate existing components

### Code Quality

- [ ] Remove all `any` types
- [ ] Standardize component interfaces
- [ ] Implement error boundaries
- [ ] Add comprehensive error handling
- [ ] Optimize bundle size

### Performance

- [ ] Implement React.memo where appropriate
- [ ] Add service worker for caching
- [ ] Optimize component re-renders
- [ ] Implement lazy loading
- [ ] Add performance monitoring

### Accessibility

- [ ] Add ARIA labels to all interactive elements
- [ ] Implement keyboard navigation
- [ ] Ensure color contrast compliance
- [ ] Add screen reader support
- [ ] Test with accessibility tools

### Testing

- [ ] Achieve 90%+ test coverage
- [ ] Add visual regression tests
- [ ] Implement E2E test scenarios
- [ ] Add performance tests
- [ ] Create accessibility tests

## 🎯 Expected Outcomes

### Immediate Benefits

- **Consistent Design**: Unified color and spacing system
- **Better Performance**: Optimized components and caching
- **Improved Accessibility**: WCAG compliant interface
- **Enhanced Maintainability**: Standardized code patterns

### Long-term Benefits

- **Scalability**: Design system supports future growth
- **Developer Experience**: Faster development with reusable components
- **User Experience**: Better performance and accessibility
- **Code Quality**: Reduced technical debt and improved maintainability

---

**🎯 This refactoring plan will transform Tooli into a modern, accessible, and maintainable application with a robust design system and excellent performance characteristics.**
