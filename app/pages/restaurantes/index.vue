<template>
  <div class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <h1>{{ $t('nav.restaurants') }}</h1>
    <p>Próximamente</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  title: 'Restaurantes en Gijón: dónde comer bien en 2026 | Planes en Gijón',
  meta: [
    { name: 'description', content: 'Los mejores restaurantes de Gijón seleccionados con criterio local: desde sidrerías tradicionales hasta cocina creativa asturiana.' },
    { name: 'robots', content: 'noindex, follow' },
  ],
  link: [
    { rel: 'canonical', href: `https://planesengijon.com${route.path}` },
  ],
})
</script>
