<script setup lang="ts">
import { computed, watch, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { route } from "../../js/ziggy"
import { useTheme } from "@/composables/useTheme"
import { Head } from "@inertiajs/vue3"
import { useAppStore } from "@/js/store/useAppStore"
 
defineProps<{ 
  message: string; 
  title: string; 
  user: {
    name: string
  } }>()
const { theme, setTheme } = useTheme({ defaultTheme: "corporate" })

// Theme
const themes = [
  { key: "corporate", label: "Light" },
  { key: "business", label: "Dark" },
  { key: "wireframe", label: "Wireframe" },
] as const

// App Store
const appStore = useAppStore()

// i18n
const { locale } = useI18n()

const languages = [
  { key: "en", label: "EN" },
  { key: "de", label: "DE" },
] as const

const activeLang = computed(() => appStore.locale)

function setLang(lang: string) {
  appStore.setLocale(lang)

}  
// Sync Pinia → vue-i18n
watch(
  () => appStore.locale,
  (newLocale) => {
    locale.value = newLocale
  },
  { immediate: true }
)

// Ensure i18n is initialized correctly on mount
onMounted(() => {
  locale.value = appStore.locale
})
</script>

<template>
  <Head>
    <title>{{ title }}</title>
    <meta name="description" content="Your page description" />
  </Head>

  <main class="p-6">
    <h1 class="text-xl font-semibold">{{ $t("welcome") }} - {{ user.name }}</h1>
    <h1 class="text-xl font-semibold">{{message}}</h1>

    <section class="mt-6 space-y-6">
      <div class="opacity-70">Current theme: {{ theme }}</div>

      <div class="flex flex-wrap gap-3">
        <button
          v-for="t in themes"
          :key="t.key"
          class="btn"
          :class="theme === t.key ? 'btn-primary' : 'btn-outline'"
          @click="setTheme(t.key)"
        >
          {{ t.label }}
        </button>
      </div>

      <div class="text-lg font-semibold"></div>

      <div class="flex gap-2">
        <button
          v-for="l in languages"
          :key="l.key"
          class="btn"
          :class="activeLang === l.key ? 'btn-primary' : 'btn-outline'"
          @click="setLang(l.key)"
        >
          {{ l.label }}
        </button>
      </div>

      <div>
        <Link :href="route('users.show', { id: 1 })" class="btn btn-primary">
          {{ $t("page1") }}
        </Link>
      </div>
    </section>
  </main>
</template>