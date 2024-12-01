export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        danger: '#e63946',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
}

// `content` define quais arquivos o Tailwind vai escanear para identificar as classes CSS usadas. 
//    Isso permite que o Tailwind remova CSS não utilizado em produção, reduzindo o tamanho do arquivo final.
//    Essa configuração ajuda a manter o CSS final leve e apenas com as classes realmente utilizadas no projeto