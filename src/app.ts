import { createApp, h } from "vue";
import { createInertiaApp, Link } from "@inertiajs/vue3";
import { route } from "./js/ziggy";
import "./assets/main.css";
import { themeChange } from 'theme-change'
import { i18n    } from "./i18n"

async function loadZiggy() {
  if (window.Ziggy) return;

  const res = await fetch("/ziggy", { headers: { Accept: "application/json" } });
  window.Ziggy = await res.json();
}

async function bootstrap() {
  await loadZiggy();
 
  createInertiaApp({
    title: title=>`FJM | ${title}`,
    resolve: (name) => {
      const pages = import.meta.glob("./Pages/**/*.vue", { eager: true }) as any;
      return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
      const vueApp = createApp({ render: () => h(App, props) });
      vueApp.use(plugin);
      vueApp.component("Link", Link);
      vueApp.config.globalProperties.$route = route;
      vueApp.use(i18n)

      vueApp.mount(el);
      themeChange(false)

    },
  });
}

bootstrap();
