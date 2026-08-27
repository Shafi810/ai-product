/**
 * AI Product Design System Tokens
 * Dark-mode-first aesthetic with glowing cyan/violet accents, high-contrast typography,
 * strict layout rhythm, and component-level style tokens.
 */

export const colors = {
  // Background Hierarchy (Deep Space Palette)
  background: {
    app: '#08080a',        // Deepest canvas
    surface: '#0f0f14',    // Primary container / Cards
    elevated: '#171720',   // Modals / Popovers / Floating UI
    subtle: '#20202d',     // Subtle inputs / Inactive elements
    border: '#29293a',     // Subtle structural lines
    borderHover: '#3f3f56',// Interactive border hover
  },

  // Foreground Hierarchy
  foreground: {
    primary: '#f4f4f6',   // High-contrast headings & primary text
    secondary: '#a0a0b2', // Body text / Subtitles
    muted: '#69697e',     // Secondary metadata / Placeholders
    disabled: '#424254',  // Disabled text states
    inverse: '#08080a',   // Text on high-contrast white/light buttons
  },

  // Brand & AI Core Accents (Neon & Plasma Spectrum)
  brand: {
    cyan: {
      DEFAULT: '#00f2fe',
      glow: 'rgba(0, 242, 254, 0.25)',
      dim: '#005b60',
    },
    violet: {
      DEFAULT: '#7928ca',
      glow: 'rgba(121, 40, 202, 0.3)',
      dim: '#3d1267',
    },
    emerald: {
      DEFAULT: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      dim: '#04422d',
    },
    rose: {
      DEFAULT: '#f43f5e',
      glow: 'rgba(244, 63, 94, 0.25)',
      dim: '#5c0f1f',
    },
  },

  // AI Semantic States
  ai: {
    thinking: '#7928ca',   // Pulsing violet state
    generating: '#00f2fe', // Streaming response state
    success: '#10b981',    // Executed tool / Code run ok
    error: '#f43f5e',      // Agent failure / API error
    warning: '#f59e0b',    // Token threshold warning
  },

  // Gradients
  gradients: {
    aiGlow: 'linear-[#00f2fe,#7928ca]',
    aiGlowCss: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
    subtleSurface: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
    borderGlow: 'linear-gradient(135deg, rgba(0,242,254,0.5) 0%, rgba(121,40,202,0.5) 100%)',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'var(--font-geist-mono), "JetBrains Mono", Fira Code, monospace',
  },
  fontSize: {
    '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],   // 11px
    xs: ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],     // 12px
    sm: ['0.875rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],        // 14px
    base: ['1rem', { lineHeight: '1.625rem', letterSpacing: '-0.01em' }],    // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.02em' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.03em' }],// 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.035em' }], // 36px
    '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.04em' }],       // 48px
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.6)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7)',
  // Glowing AI Accent Shadows
  glowCyan: '0 0 20px -3px rgba(0, 242, 254, 0.35)',
  glowViolet: '0 0 20px -3px rgba(121, 40, 202, 0.4)',
  glowEmerald: '0 0 20px -3px rgba(16, 185, 129, 0.35)',
} as const;

export const radii = {
  none: '0px',
  sm: '0.375rem',  // 6px - Small badges / tooltips
  md: '0.5rem',    // 8px - Buttons / Inputs
  lg: '0.75rem',   // 12px - Cards / Modals
  xl: '1rem',      // 16px - Large containers
  '2xl': '1.5rem', // 24px - Floating AI Chat Bar
  full: '9999px',
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: '350ms cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  radii,
  transitions,
} as const;

export type Theme = typeof theme;
export default theme;