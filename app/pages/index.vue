<template>
    <div>
      <h1>Planes en Gijón</h1>
      <pre>{{ restaurantes }}</pre>
    </div>
  </template>
  
  <script setup lang="ts">
  const { find } = useStrapi()
  const restaurantes = await find('restaurants')
  </script>