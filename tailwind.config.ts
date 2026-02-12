import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#13131a',
        'bg-tertiary': '#1a1a24',
        'bg-card': 'rgba(30, 30, 46, 0.6)',
        'accent-purple': '#9333ea',
        'accent-purple-hover': '#a855f7',
        'accent-purple-dark': '#7e22ce',
        'accent-cyan': '#06b6d4',
        'accent-gold': '#f59e0b',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'border-subtle': 'rgba(147, 51, 234, 0.1)',
        'border-main': 'rgba(147, 51, 234, 0.3)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Desabilita o reset do Tailwind para não conflitar com nosso CSS
  },
};
export default config;
