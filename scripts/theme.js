const themeSwitcher = document.getElementById('theme-switcher');
const themeStyle = document.getElementById('theme-style');
const dark_css = '/css/dark_style.css'
const light_css = '/css/light_style.css'
const savedTheme = localStorage.getItem('theme');
const sun = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
const moon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>'
themeSwitcher.textContent = sun;


if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themeStyle.href = dark_css;
} else {
    themeStyle.href = light_css;
}

// Update localStorage when theme is switched
themeSwitcher.addEventListener('click', () => {
    if (themeStyle.href.includes('light_style.css')) {
        themeStyle.href = dark_css;
        localStorage.setItem('theme', 'dark');
        themeSwitcher.innerHTML = moon;
    } else {
        themeStyle.href = light_css;
        localStorage.setItem('theme', 'light');
        themeSwitcher.innerHTML = sun; 
        // Set to 'L' for light mode
    }
});

// On page load, check localStorage for saved theme
document.addEventListener('DOMContentLoaded', () => {
    if (savedTheme === 'dark') {
        themeStyle.href = dark_css;
        themeSwitcher.innerHTML = moon;
    } else {
        themeStyle.href = light_css;
        themeSwitcher.innerHTML = sun; // Set to 'L' for light mode
    }
});
