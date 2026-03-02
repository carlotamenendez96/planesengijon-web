<template>
  <div class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <h1>{{ $t('nav.itineraries') }}</h1>
    <p>Próximamente</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  title: 'Itinerarios por Gijón: rutas de 1, 2 y 3 días | Planes en Gijón',
  meta: [
    { name: 'description', content: 'Itinerarios pensados para sacarle el máximo partido a Gijón: qué ver en un fin de semana, con niños, en pareja o con perro.' },
    { name: 'robots', content: 'noindex, follow' },
  ],
  link: [
    { rel: 'canonical', href: `https://planesengijon.com${route.path}` },
  ],
})
</script>
