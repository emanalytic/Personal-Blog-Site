/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: '#FDFBF7',
                sepia: '#E3D7C6',
                charcoal: '#333333',
                clay: '#A68A64',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                mono: ['"LXGW WenKai Mono TC"', 'monospace'],
                sans: ['"LXGW WenKai Mono TC"', 'sans-serif'], // Use as default body
            },
            backgroundColor: theme => ({
                ...theme('colors'),
                'paper': '#FDFBF7',
            }),
        },
    },
    plugins: [],
}
