export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}")||"light";var el=document.documentElement;el.classList.remove("light","dark");el.classList.add(t);el.style.colorScheme=t;}catch(e){}})();`;