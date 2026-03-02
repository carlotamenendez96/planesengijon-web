<template>
  <div class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <h1>{{ $t('nav.beaches') }}</h1>
    <p>Próximamente</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

useHead({
  title: `${slug} | Playas de Gijón y Asturias | Planes en Gijón`,
  meta: [
    { name: 'robots', content: 'noindex, follow' },
  ],
  link: [
    { rel: 'canonical', href: `https://planesengijon.com${route.path}` },
  ],
})
</script>
