<template>
  <article class="itinerary-card">
    <!-- Imagen -->
    <div class="itinerary-card__img-wrap">
      <img
        :src="imageUrl || '/img/placeholder-itinerary.webp'"
        :alt="title"
        class="itinerary-card__img"
        loading="lazy"
        width="600"
        height="400"
      />
      <div class="itinerary-card__img-overlay" aria-hidden="true"></div>

      <!-- Badge featured -->
      <div v-if="isFeatured" class="itinerary-card__badge">
        <span>{{ $t('itineraries.badge') }}</span>
      </div>

      <!-- Info sobre imagen -->
      <div class="itinerary-card__meta-overlay">
        <h3 class="itinerary-card__title">{{ title }}</h3>
        <div class="itinerary-card__meta">
          <span class="itinerary-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {{ duration }} {{ $t('itineraries.days') }}
          </span>
          <span class="itinerary-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            {{ difficultyLabel }}
          </span>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="itinerary-card__body">
      <p v-if="description" class="itinerary-card__description">{{ description }}</p>
      <NuxtLink :to="localePath({ name: 'itinerarios-slug', params: { slug } })" class="btn btn-primary itinerary-card__cta">
        {{ $t('itineraries.cta') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  title: string
  slug: string
  duration?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  isFeatured?: boolean
  imageUrl?: string
  description?: string
}>()

const difficultyLabel = computed(() => {
  const map: Record<string, string> = {
    easy: t('itineraries.difficulty.easy'),
    medium: t('itineraries.difficulty.medium'),
    hard: t('itineraries.difficulty.hard'),
  }
  return props.difficulty ? map[props.difficulty] : map.easy
})
</script>

<style scoped>
.itinerary-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--transition), transform var(--transition);
}

.itinerary-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* Imagen */
.itinerary-card__img-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.itinerary-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.itinerary-card:hover .itinerary-card__img {
  transform: scale(1.04);
}

.itinerary-card__img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17,24,39,.85) 0%, rgba(17,24,39,.2) 55%, transparent 100%);
}

/* Badge */
.itinerary-card__badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--color-accent);
  color: var(--color-dark);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Meta overlay */
.itinerary-card__meta-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  color: #fff;
}

.itinerary-card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.itinerary-card__meta {
  display: flex;
  gap: 1rem;
}

.itinerary-card__meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: rgba(255,255,255,.85);
}

/* Body */
.itinerary-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
}

.itinerary-card__description {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.itinerary-card__cta {
  font-size: 0.875rem;
  padding: 0.6rem 1.125rem;
  align-self: flex-start;
  margin-top: auto;
}
</style>
