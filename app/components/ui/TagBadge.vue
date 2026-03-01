<template>
  <span class="tag-badge" :class="`tag-badge--${variant}`">
    <span v-if="emoji" class="tag-badge__emoji" aria-hidden="true">{{ emoji }}</span>
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  emoji?: string
  variant?: 'default' | 'primary' | 'accent' | 'dark' | 'surface'
}>(), {
  variant: 'default',
})
</script>

<style scoped>
.tag-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.tag-badge__emoji {
  font-size: 0.85rem;
  line-height: 1;
}

.tag-badge--default {
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.tag-badge--primary {
  background: rgba(26, 75, 140, 0.12);
  color: var(--color-primary);
}

.tag-badge--accent {
  background: rgba(232, 160, 32, 0.15);
  color: #9a6910;
}

.tag-badge--dark {
  background: rgba(17, 24, 39, 0.7);
  color: #fff;
  backdrop-filter: blur(4px);
}

.tag-badge--surface {
  background: var(--color-surface);
  color: var(--color-text);
}
</style>
