
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ide-background': 'var(--ide-background)',
        'ide-foreground': 'var(--ide-foreground)',
        'ide-panel': 'var(--ide-panel)',
        'ide-sidebar': 'var(--ide-sidebar)',
        'ide-header': 'var(--ide-header)',
        'ide-border': 'var(--ide-border)', // Ensure this is defined
        'ide-hover': 'var(--ide-hover)',
        'ide-active-background': 'var(--ide-active-background)',
        'ide-accent': 'var(--ide-accent)',
        'ide-muted': 'var(--ide-muted)',
        'ide-info': 'var(--ide-info)',
        'ide-success': 'var(--ide-success)',
        'ide-warning': 'var(--ide-warning)',
        'ide-danger': 'var(--ide-danger)',
        'ide-highlight': 'var(--ide-highlight)',
      },
      opacity: {
        '20': '0.2', // Add this to generate opacity classes
      },
      scale: {
        '102': '1.02',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-premium-hover': 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #131723, #0f1219)',
      },
      boxShadow: {
        'premium': '0 4px 14px 0 rgba(102, 126, 234, 0.25)',
        'glow': '0 0 15px rgba(139,92,246,0.3)',
      },
    },
  },
  safelist: [
    'hover:border-ide-accent/20',
    'dark:hover:border-ide-accent/20',
    'bg-ide-border/20', // Add this to the safelist
    'dark:bg-ide-border/20', // And its dark variant
  ],
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
} satisfies Config
