<template>
  <div class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <h1>{{ $t('nav.gastronomy') }}</h1>
    <p>Próximamente</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  title: 'Gastronomía en Gijón: restaurantes, sidrerías y cocina asturiana | Planes en Gijón',
  meta: [
    { name: 'description', content: 'Descubre la gastronomía de Gijón: los mejores restaurantes, sidrerías tradicionales y productos estrella de la cocina asturiana.' },
    { name: 'robots', content: 'noindex, follow' },
  ],
  link: [
    { rel: 'canonical', href: `https://planesengijon.com${route.path}` },
  ],
})
</script>
