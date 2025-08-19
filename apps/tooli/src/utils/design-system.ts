/**
 * Design System Utilities
 * Provides functions to access design system values programmatically
 */

/**
 * Get a CSS variable value from the computed styles
 * @param variableName - The CSS variable name (e.g., '--color-primary-600')
 * @param element - The element to get the computed style from (defaults to document.documentElement)
 * @returns The computed value of the CSS variable
 */
export function getCSSVariable(
  variableName: string,
  element: Element = document.documentElement
): string {
  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    return '';
  }

  const computedStyle = getComputedStyle(element);
  return computedStyle.getPropertyValue(variableName).trim();
}

/**
 * Get wheel colors as an array of hex values
 * @returns Array of wheel color hex values
 */
export function getWheelColors(): string[] {
  return [
    '#ff6b6b', // var(--wheel-color-1) - Vibrant red
    '#4ecdc4', // var(--wheel-color-2) - Teal
    '#45b7d1', // var(--wheel-color-3) - Blue
    '#96ceb4', // var(--wheel-color-4) - Mint green
    '#ffeaa7', // var(--wheel-color-5) - Yellow
    '#dda0dd', // var(--wheel-color-6) - Purple
    '#98d8c8', // var(--wheel-color-7) - Sage green
    '#f7dc6f', // var(--wheel-color-8) - Gold
    '#bb8fce', // var(--wheel-color-9) - Lavender
    '#85c1e9', // var(--wheel-color-10) - Sky blue
    '#f8c471', // var(--wheel-color-11) - Orange
    '#82e0aa', // var(--wheel-color-12) - Light green
  ];
}

/**
 * Get a random wheel color
 * @returns A random wheel color hex value
 */
export function getRandomWheelColor(): string {
  const colors = getWheelColors();
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Get primary colors as an object
 * @returns Object with primary color hex values
 */
export function getPrimaryColors(): Record<string, string> {
  return {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  };
}

/**
 * Get semantic colors as an object
 * @returns Object with semantic color hex values
 */
export function getSemanticColors(): Record<string, string> {
  return {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  };
}

/**
 * Check if dark mode is active
 * @returns True if dark mode is active
 */
export function isDarkMode(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return document.documentElement.classList.contains('dark');
}

/**
 * Get spacing value by name
 * @param spacingName - The spacing name (e.g., '4', '8', '12')
 * @returns The spacing value in rem
 */
export function getSpacing(spacingName: string): string {
  const spacingMap: Record<string, string> = {
    '0': '0',
    px: '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
    '11': '2.75rem',
    '12': '3rem',
    '14': '3.5rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '28': '7rem',
    '32': '8rem',
    '36': '9rem',
    '40': '10rem',
    '44': '11rem',
    '48': '12rem',
    '52': '13rem',
    '56': '14rem',
    '60': '15rem',
    '64': '16rem',
    '72': '18rem',
    '80': '20rem',
    '96': '24rem',
  };

  return spacingMap[spacingName] || '1rem';
}
