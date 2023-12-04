import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        custom: '0 0 16px 0 rgba(16, 16, 16, 0.1)',
      },
      colors: {
        misc: {
          white: '#FFFFFF',
          lightGray: '#F2F2F2',
          gray: '#2A2A2A',
          darkGray: '#202020',
        },
      },
    },
  },
  plugins: [],
};
export default config;
