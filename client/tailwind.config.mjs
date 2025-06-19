/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        marcellus:['Marcellus','sans-serif'],
        forum:['Forum','sans-serif']
      },

      colors:{
        lagoBlack: '#1D1D1B',
        lagoBlack2: "#1b1c21",
        lagoGray: '#4B4E4F',
        lagoGray2: "#a6a6a6",
        lagoBrown:'#24292C'
      },

       boxShadow: {
        custom: '0px 2px 13px 0px rgba(0, 0, 0, 0.10)',  
        buttonCustom: '0px 0px 50px 0px rgba(20, 12, 41, 0.07)',  
        divCustom:'2px 5px 100px 6px rgba(20, 12, 41, 0.05)'
      },

      screens: {
        'tablet': '640px',

        'laptop': '1024px',

        'laptop': '1024px',

        'desktop': '1280px',
        "laptopMac":"1920px" 
        
      },
      
    },
  },
  plugins: [],
};
