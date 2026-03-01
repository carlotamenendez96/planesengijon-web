<template>
  <article class="place-card">
    <div class="place-card__img-wrap">
      <img
        :src="imageUrl || '/img/placeholder-place.webp'"
        :alt="title"
        class="place-card__img"
        loading="lazy"
        width="400"
        height="280"
      />
      <div class="place-card__overlay" aria-hidden="true"></div>
      <div v-if="category" class="place-card__category">{{ category }}</div>
    </div>

    <div class="place-card__body">
      <h3 class="place-card__title">{{ title }}</h3>
      <p v-if="description" class="place-card__description">{{ description }}</p>

      <div v-if="tags && tags.length" class="place-card__tags">
        <TagBadge v-for="tag in tags.slice(0, 3)" :key="tag">{{ tag }}</TagBadge>
      </div>

      <NuxtLink v-if="slug" :to="localePath(`/lugares/${slug}`)" class="place-card__link">
        Ver más
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  slug?: string
  description?: string
  category?: string
  imageUrl?: string
  tags?: string[]
}>()

const localePath = useLocalePath()
</script>

<style scoped>
.place-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--transition), transform var(--transition);
}

.place-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

.place-card__img-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.place-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.place-card:hover .place-card__img {
  transform: scale(1.04);
}

.place-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17,24,39,.4), transparent 60%);
}

.place-card__category {
  position: absolute;
  bottom: 0.75rem;
  left: 0.875rem;
  background: rgba(17,24,39,.65);
  backdrop-filter: blur(4px);
  color: #fff;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.place-card__body {
  padding: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.place-card__title {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  color: var(--color-dark);
  line-height: 1.3;
}

.place-card__description {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.place-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.place-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: auto;
  transition: gap var(--transition);
}

.place-card__link:hover { gap: 0.5rem; }
</style>
