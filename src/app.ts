import { createApp, h } from "vue";
import { createInertiaApp, Link,router  } from "@inertiajs/vue3";
import { route } from "./js/ziggy";
import "./assets/main.css";
import { themeChange } from 'theme-change'
import { i18n    } from "./i18n"
import AppWrapper from "./Layouts/AppWrapper.vue";
import { createPinia } from "pinia";
import { useAppStore } from "./js/store/useAppStore";
import { useUserStore } from "./js/store/useUserStore";
const app_name = import.meta.env.VITE_APP_NAME

async function loadZiggy() {
  if (window.Ziggy) return;

  const res = await fetch("/ziggy", { headers: { Accept: "application/json" } });
  window.Ziggy = await res.json();
}

async function bootstrap() {
  await loadZiggy();

  createInertiaApp({
    title: (title) => `${app_name} | ${title}`,
    resolve: (name) => {
      const pages = import.meta.glob("./Pages/**/*.vue", { eager: true }) as any;
      return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
      const pinia = createPinia();
      const vueApp = createApp({
        render: () =>
          h(AppWrapper, null, {
            default: () => h(App, props),
          }),
      });

      vueApp.use(plugin);
      vueApp.component("Link", Link);
      vueApp.use(i18n);
      vueApp.use(pinia);
      vueApp.config.globalProperties.$route = route; 
      router.on('navigate', (event) => {
        const page = event.detail.page
        const shared = page.props
        useAppStore(pinia).hydrateFromInertia(shared)
      })
      vueApp.mount(el); 
      themeChange(false);
    },
  });
}

bootstrap();
