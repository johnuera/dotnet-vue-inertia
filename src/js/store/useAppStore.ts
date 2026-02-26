import { defineStore } from "pinia";

type InertiaSharedProps = {
  locale?: string;
  title?: string;
  [key: string]: any;
};

export const useAppStore = defineStore("app", {
  state: () => ({
    locale: localStorage.getItem("locale") || "de",
    theme: localStorage.getItem("theme") || "corporate",
    title: "Hello" as string,
  }),

  actions: {
    hydrateFromInertia(shared: InertiaSharedProps) {
      if (shared?.title) {
        this.title = shared.title;
      }
    },

    setLocale(locale: string) {
      this.locale = locale;
      localStorage.setItem("locale", locale);
    },
  },
});