<template>
  <component
    :is="slug ? NuxtLink : 'article'"
    :to="slug ? localePath(`/playas/${slug}`) : undefined"
    class="beach-card"
  >
    <div class="beach-card__img-wrap">
      <img
        :src="imageUrl || '/img/placeholder-beach.webp'"
        :alt="name"
        class="beach-card__img"
        loading="lazy"
        width="600"
        height="400"
      />
      <div class="beach-card__overlay" aria-hidden="true"></div>

      <!-- Tiempo en coche -->
      <div v-if="driveMinutes" class="beach-card__drive">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5M16 17H9m-4 0a2 2 0 104 0 2 2 0 00-4 0m11 0a2 2 0 104 0 2 2 0 00-4 0"/>
        </svg>
        <span>{{ driveMinutes }}' {{ $t('beaches.byCar') }}</span>
      </div>

      <!-- Contenido principal sobre imagen -->
      <div class="beach-card__content">
        <p v-if="municipality" class="beach-card__municipality">{{ municipality }}</p>
        <h3 class="beach-card__name">{{ name }}</h3>

        <!-- Tags -->
        <div v-if="tags && tags.length" class="beach-card__tags">
          <TagBadge
            v-for="tag in tags.slice(0, 3)"
            :key="tag"
            variant="dark"
          >{{ tag }}</TagBadge>
        </div>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

defineProps<{
  name: string
  slug?: string
  municipality?: string
  driveMinutes?: number
  imageUrl?: string
  tags?: string[]
}>()

const localePath = useLocalePath()
</script>

<style scoped>
.beach-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow var(--transition), transform var(--transition);
}

.beach-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.beach-card__img-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.beach-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.beach-card:hover .beach-card__img {
  transform: scale(1.05);
}

.beach-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17,24,39,.9) 0%, rgba(17,24,39,.2) 50%, transparent 100%);
}

/* Tiempo en coche */
.beach-card__drive {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(17,24,39,.65);
  backdrop-filter: blur(6px);
  color: #fff;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 600;
}

/* Contenido */
.beach-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  color: #fff;
}

.beach-card__municipality {
  font-size: 0.75rem;
  color: rgba(255,255,255,.65);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.3rem;
}

.beach-card__name {
  font-family: var(--font-display);
  font-size: 1.375rem;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.beach-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
</style>
