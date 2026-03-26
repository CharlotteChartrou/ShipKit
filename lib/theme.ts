export const THEME_STORAGE_KEY = "signal-theme";

export type Theme = "light" | "dark";

export function resolveThemeFromStorage(storedTheme: string | null, prefersDark: boolean): Theme {
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return prefersDark ? "dark" : "light";
}

export function getThemeBootstrapScript() {
  return `
(() => {
  const storageKey = "${THEME_STORAGE_KEY}";
  const storedTheme = window.localStorage.getItem(storageKey);
  const theme = storedTheme === "dark" || storedTheme === "light"
    ? storedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
})();
`;
}
