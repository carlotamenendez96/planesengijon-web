<script setup lang="ts">
const { locales } = useI18n()
const route = useRoute()

useHead({
  link: locales.value.map((locale: any) => ({
    rel: 'alternate',
    hreflang: locale.language,
    href: `https://planesengijon.com${locale.code === 'es' ? '' : '/' + locale.code}${route.path}`,
  })),
})
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
