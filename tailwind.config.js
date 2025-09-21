/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        primary: {
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
        },
        lsb: {
          primary: '#154D71',      // Custom blue - primary
          secondary: '#06b6d4',    // Cyan - secondary
          accent: '#10b981',       // Emerald - accent
          search: '#14B8A6',       // Medium teal - search button
          dark: '#374151',         // Gray-700 - dark header
          light: '#6b7280',        // Gray-500 - navigation
          gray: '#f9fafb',         // Gray-50 - background
          text: '#111827',         // Gray-900 - text
          border: '#d1d5db',       // Gray-300 - border
          lightGray: '#f3f4f6',    // Gray-100 - light background
          success: '#059669',      // Emerald-600 - success
          warning: '#d97706',      // Amber-600 - warning
          error: '#dc2626'         // Red-600 - error
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['11px', '16px'],
        'sm': ['12px', '18px'],
        'base': ['13px', '19px'],
        'lg': ['14px', '20px'],
        'xl': ['16px', '24px'],
        '2xl': ['18px', '28px'],
        '3xl': ['20px', '32px'],
      },
      spacing: {
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
