import { createI18n } from "vue-i18n"
import en from "./locales/en.json"
import de from "./locales/de.json"

export const i18n = createI18n({
  legacy: false, // IMPORTANT for Composition API
  globalInjection: true, // allows {{ $t() }} without useI18n()
  locale: localStorage.getItem("lang") || "en",
  fallbackLocale: "en",
  messages: {
    en,
    de,
  },
})