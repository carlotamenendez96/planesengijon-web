<template>
  <component
    :is="slug ? NuxtLink : 'article'"
    :to="slug ? localePath({ name: 'restaurantes-slug', params: { slug } }) : undefined"
    class="restaurant-card"
  >
    <!-- Imagen -->
    <div class="restaurant-card__img-wrap">
      <img
        :src="imageUrl || '/img/placeholder-restaurant.webp'"
        :alt="name"
        class="restaurant-card__img"
        loading="lazy"
        width="400"
        height="260"
      />
      <!-- Badge featured -->
      <div v-if="isFeatured" class="restaurant-card__featured-badge" aria-label="Selección destacada">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        {{ $t('restaurants.featured') }}
      </div>
    </div>

    <!-- Body -->
    <div class="restaurant-card__body">
      <div class="restaurant-card__header">
        <h3 class="restaurant-card__name">{{ name }}</h3>
        <span v-if="priceRange" class="restaurant-card__price" :aria-label="`Precio: ${priceSymbol}`">
          {{ priceSymbol }}
        </span>
      </div>

      <p v-if="cuisineType" class="restaurant-card__cuisine">{{ cuisineType }}</p>

      <p v-if="editorialNote" class="restaurant-card__note">
        <em>{{ editorialNote }}</em>
      </p>

      <!-- Tags -->
      <div v-if="tags && tags.length" class="restaurant-card__tags">
        <TagBadge v-for="tag in tags.slice(0, 3)" :key="tag">{{ tag }}</TagBadge>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const localePath = useLocalePath()

const props = defineProps<{
  name: string
  slug?: string
  cuisineType?: string
  priceRange?: string
  isFeatured?: boolean
  editorialNote?: string
  imageUrl?: string
  tags?: string[]
  /**
   * Nivel de partnership con el restaurante.
   * - 'premium' → badge dorado + posición primera (pendiente de implementar)
   * - 'basic'   → posición preferente sin badge visual (pendiente)
   * - 'free'    → tratamiento estándar
   */
  partnerTier?: 'free' | 'basic' | 'premium'
}>()

const priceSymbol = computed(() => {
  const map: Record<string, string> = { low: '€', medium: '€€', high: '€€€' }
  return props.priceRange ? map[props.priceRange] : ''
})
</script>

<style scoped>
.restaurant-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--transition), transform var(--transition);
}

.restaurant-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

/* Imagen */
.restaurant-card__img-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.restaurant-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.restaurant-card:hover .restaurant-card__img {
  transform: scale(1.04);
}

/* Badge featured dorado */
.restaurant-card__featured-badge {
  position: absolute;
  top: 0.875rem;
  left: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: var(--color-accent);
  color: var(--color-dark);
  padding: 0.25rem 0.7rem;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Body */
.restaurant-card__body {
  padding: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.restaurant-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.restaurant-card__name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--color-dark);
  line-height: 1.25;
}

.restaurant-card__price {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
}

.restaurant-card__cuisine {
  font-size: 0.8rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.restaurant-card__note {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.restaurant-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.25rem;
}
</style>
