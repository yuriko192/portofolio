// tailwind.config.cjs
module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
    ],
    theme: {
        extend: {
            screens: {
                'tall': { 'raw': '(min-height: 800px)' },
                'xtall': { 'raw': '(min-height: 1000px)' },
            }
        }
    }
    // more options here
};