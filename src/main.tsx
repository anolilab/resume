import "@fontsource/nunito";
import "@fontsource/noto-sans-sc";

const STORAGE_KEY = "color-theme";
const themeToggleDarkIcon = document.querySelector("#theme-toggle-dark-icon");
const themeToggleLightIcon = document.querySelector("#theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (localStorage.getItem(STORAGE_KEY) === "dark" || (!(STORAGE_KEY in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    themeToggleLightIcon?.classList.remove("hidden");
} else {
    themeToggleDarkIcon?.classList.remove("hidden");
}

const themeToggleButton = document.querySelector("#theme-toggle");

themeToggleButton?.addEventListener("click", () => {
    // toggle icons inside button
    themeToggleDarkIcon?.classList.toggle("hidden");
    themeToggleLightIcon?.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem(STORAGE_KEY)) {
        if (localStorage.getItem(STORAGE_KEY) === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem(STORAGE_KEY, "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem(STORAGE_KEY, "light");
        }
        // if NOT set via local storage previously
    } else if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem(STORAGE_KEY, "light");
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem(STORAGE_KEY, "dark");
    }
});
