<template>
  <div class="container" style="padding-top: 4rem; padding-bottom: 4rem;">
    <h1>{{ $t('nav.places') }}</h1>
    <p>Próximamente</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  title: 'Lugares que ver en Gijón: monumentos, museos y rincones únicos | Planes en Gijón',
  meta: [
    { name: 'description', content: 'Descubre los mejores lugares de Gijón: el Cerro de Santa Catalina, el barrio de Cimadevilla, el Acuario y mucho más.' },
    { name: 'robots', content: 'noindex, follow' },
  ],
  link: [
    { rel: 'canonical', href: `https://planesengijon.com${route.path}` },
  ],
})
</script>
