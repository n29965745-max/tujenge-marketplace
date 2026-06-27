import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Brand palette — Tujenge (Option 1 + Option 3 accents)
        navy: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        gold: {
          900: '#7A5B0A',
          700: '#A07D0E',
          500: '#D4A017',
          400: '#E0B53A',
          300: '#F4D58D',
          200: '#FAEED1',
          100: '#FDF8E8',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          100: '#D1FAE5',
        },
        // Semantic tokens (mapped to brand)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        success: '#10B981',
        warning: '#D97706',
        danger: '#B91C1C',
        info: '#0369A1',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Manrope', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-xl': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['clamp(1.5rem, 2.5vw, 1.875rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'gold-sm': '0 4px 14px rgba(212, 160, 23, 0.25)',
        'gold-md': '0 8px 24px rgba(212, 160, 23, 0.35)',
        'gold-lg': '0 16px 40px rgba(212, 160, 23, 0.4)',
        'navy-sm': '0 4px 14px rgba(15, 23, 42, 0.15)',
        'navy-md': '0 8px 24px rgba(15, 23, 42, 0.2)',
        'navy-lg': '0 16px 40px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4A017 0%, #F4D58D 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 160, 23, 0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 160, 23, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 1.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2.5s ease-out infinite',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
