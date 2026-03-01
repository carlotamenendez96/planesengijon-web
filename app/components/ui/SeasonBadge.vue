<template>
  <span class="season-badge" :class="`season-badge--${season}`">
    <span class="season-badge__emoji" aria-hidden="true">{{ emoji }}</span>
    <span>{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  season: 'verano' | 'otono' | 'invierno' | 'primavera'
  label: string
}>()

const emojiMap: Record<string, string> = {
  verano: '☀️',
  otono: '🍂',
  invierno: '🌊',
  primavera: '🌿',
}

const emoji = computed(() => emojiMap[props.season] ?? '📅')
</script>

<style scoped>
.season-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.season-badge__emoji {
  font-size: 0.9rem;
  line-height: 1;
}

.season-badge--verano {
  background: rgba(255, 193, 7, 0.15);
  color: #8a6200;
}

.season-badge--otono {
  background: rgba(180, 80, 20, 0.12);
  color: #8b3a00;
}

.season-badge--invierno {
  background: rgba(26, 75, 140, 0.12);
  color: var(--color-primary);
}

.season-badge--primavera {
  background: rgba(34, 130, 64, 0.12);
  color: #1a6035;
}
</style>
