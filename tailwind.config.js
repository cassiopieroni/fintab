export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// `content` define quais arquivos o Tailwind vai escanear para identificar as classes CSS usadas. 
//    Isso permite que o Tailwind remova CSS não utilizado em produção, reduzindo o tamanho do arquivo final.
//    Essa configuração ajuda a manter o CSS final leve e apenas com as classes realmente utilizadas no projeto