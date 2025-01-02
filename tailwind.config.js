/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/daisyui/dist/**/*.{js,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBackground: '#F8FAFC', // 页面背景
        darkBackground: '#1E293B',
        cardLight: '#FFFFFF',
        cardDark: '#2D3748',
        borderLight: '#E2E8F0',
        borderDark: '#4A5568',
        lightText: '#1E293B',
        darkText: '#F9FAFB',
        primary: '#3B82F6', // 修改为更柔和的蓝色
        accent: '#ffffff',
        danger: '#EF4444',
        success: '#22C55E',
        secondary: '#6B7280', // 修改为现代灰色
        grayLight: '#F3F4F6',
        info: '#60A5FA', // 浅蓝色信息色
        neutral: '#9CA3AF',
        overlayDark: 'rgba(0, 0, 0, 0.5)',
        overlayLight: 'rgba(255, 255, 255, 0.5)',
      }
    }
  },
  plugins: [
    require("daisyui"),
  ],
}
