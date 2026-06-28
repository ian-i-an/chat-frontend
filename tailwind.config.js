/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}", // 프로젝트 구조에 맞게 경로 확인 필요
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true, // 이 한 줄 때문에 만드는 겁니다!
  },
};
