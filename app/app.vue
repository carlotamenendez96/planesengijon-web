<script setup lang="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// switchLocalePath() genera la URL correcta para cada locale respetando
// rutas localizadas (ej: /playas → /en/beaches, /de/straende, etc.)
useHead(computed(() => ({
  link: [
    ...locales.value.map((locale: any) => ({
      rel: 'alternate',
      hreflang: locale.language,
      href: `https://planesengijon.com${switchLocalePath(locale.code)}`,
    })),
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `https://planesengijon.com${switchLocalePath('es')}`,
    },
  ],
})))
</script>

<template>
  <div>
    <AppHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<style>
.main-content {
  padding-top: 4rem;
}
</style>
