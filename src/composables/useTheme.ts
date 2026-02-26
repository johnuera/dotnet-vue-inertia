import { onMounted, ref, watch } from "vue";
import { useAppStore } from "@/js/store/useAppStore";

type ThemeName = string;

const STORAGE_KEY = "theme";
const DEFAULT_THEME: ThemeName = "corporate";

let _theme: ReturnType<typeof ref<ThemeName>> | null = null;
let _isReady: ReturnType<typeof ref<boolean>> | null = null;

function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function useTheme(options?: {
  defaultTheme?: ThemeName;
  storageKey?: string;
}) {
  const storageKey = options?.storageKey ?? STORAGE_KEY;
  const defaultTheme = options?.defaultTheme ?? DEFAULT_THEME;

  // Singleton state shared across the app
  if (!_theme) _theme = ref<ThemeName>(defaultTheme);
  if (!_isReady) _isReady = ref(false);

  const theme = _theme;
  const isReady = _isReady;

  const setTheme = (next: ThemeName) => {
    theme.value = next;
    useAppStore().setTheme(next);
  };

  const toggleTheme = (a: ThemeName, b: ThemeName) => {
    setTheme(theme.value === a ? b : a);
  };

  // Load saved theme once (client only)
  onMounted(() => {
    const saved = localStorage.getItem(storageKey) as ThemeName | null;
    theme.value = saved ?? theme.value ?? defaultTheme;
    isReady.value = true;
  });

  // Reactively apply + persist
  watch(
    theme,
    (t) => {
      applyTheme(t);
      localStorage.setItem(storageKey, t);
    },
    { immediate: true }
  );

  return { theme, isReady, setTheme, toggleTheme };
}