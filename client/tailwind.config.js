/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            smallMobile: "280px",
            mobile: "320px",
            tablet: "640px",
            laptop: "1024px",
            desktop: "1280px",
        },
        extend: {
            fontFamily: {
                logo: ["Bungee", "cursive"],
            },
        },
    },
    plugins: [],
};
