<template>
  <div class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <h1>{{ $t('nav.beaches') }}</h1>
    <p>Próximamente</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  title: 'Playas de Gijón y Asturias: guía completa 2026 | Planes en Gijón',
  meta: [
    { name: 'description', content: 'Guía de las mejores playas de Gijón y escapadas de playa por Asturias: arena, banderas azules, aparcamiento y cómo llegar.' },
    { name: 'robots', content: 'noindex, follow' },
  ],
  link: [
    { rel: 'canonical', href: `https://planesengijon.com${route.path}` },
  ],
})
</script>
