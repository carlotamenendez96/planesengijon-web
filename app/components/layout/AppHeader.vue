<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }" role="banner">
    <div class="container header__inner">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="header__logo" aria-label="Planes en Gijón — Inicio">
        <span class="header__logo-icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </span>
        <span class="header__logo-text">Planes en Gijón</span>
      </NuxtLink>

      <!-- Nav principal -->
      <nav class="header__nav" aria-label="Navegación principal">
        <ul class="header__nav-list" role="list">
          <li><NuxtLink :to="localePath('/itinerarios')" class="header__nav-link">{{ $t('nav.itineraries') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/playas')" class="header__nav-link">{{ $t('nav.beaches') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/gastronomia')" class="header__nav-link">{{ $t('nav.gastronomy') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/restaurantes')" class="header__nav-link">{{ $t('nav.restaurants') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/lugares')" class="header__nav-link">{{ $t('nav.places') }}</NuxtLink></li>
        </ul>
      </nav>

      <!-- Acciones -->
      <div class="header__actions">
        <!-- Selector de idioma -->
        <div class="lang-selector" role="navigation" aria-label="Selector de idioma">
          <button
            class="lang-selector__trigger"
            :aria-expanded="langOpen"
            aria-haspopup="listbox"
            @click="langOpen = !langOpen"
          >
            <span>{{ currentLocale.toUpperCase() }}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <ul v-if="langOpen" class="lang-selector__dropdown" role="listbox" :aria-label="'Seleccionar idioma'">
            <li v-for="locale in availableLocales" :key="locale.code" role="option">
              <NuxtLink
                :to="switchLocalePath(locale.code)"
                class="lang-selector__option"
                :class="{ 'lang-selector__option--active': locale.code === currentLocale }"
                @click="langOpen = false"
              >
                {{ locale.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- CTA -->
        <NuxtLink :to="localePath('/planifica')" class="btn btn-primary header__cta">
          {{ $t('nav.plan') }}
        </NuxtLink>

        <!-- Burger móvil -->
        <button
          class="header__burger"
          :class="{ 'header__burger--open': mobileOpen }"
          :aria-expanded="mobileOpen"
          aria-label="Abrir menú"
          @click="mobileOpen = !mobileOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <div v-if="mobileOpen" class="header__mobile-menu">
      <nav aria-label="Menú móvil">
        <ul role="list">
          <li><NuxtLink :to="localePath('/itinerarios')" @click="mobileOpen = false">{{ $t('nav.itineraries') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/playas')" @click="mobileOpen = false">{{ $t('nav.beaches') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/gastronomia')" @click="mobileOpen = false">{{ $t('nav.gastronomy') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/restaurantes')" @click="mobileOpen = false">{{ $t('nav.restaurants') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/lugares')" @click="mobileOpen = false">{{ $t('nav.places') }}</NuxtLink></li>
        </ul>
        <div class="header__mobile-langs">
          <NuxtLink
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            class="header__mobile-lang"
            :class="{ 'header__mobile-lang--active': locale.code === currentLocale }"
            @click="mobileOpen = false"
          >
            {{ locale.code.toUpperCase() }}
          </NuxtLink>
        </div>
        <NuxtLink :to="localePath('/planifica')" class="btn btn-primary" style="width:100%;justify-content:center;" @click="mobileOpen = false">
          {{ $t('nav.plan') }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map(l => ({ code: l.code, name: l.name }))
)

const isScrolled = ref(false)
const langOpen = ref(false)
const mobileOpen = ref(false)

onMounted(() => {
  const onScroll = () => { isScrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

// Cerrar dropdown al hacer click fuera
onMounted(() => {
  const handleOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.lang-selector')) langOpen.value = false
  }
  document.addEventListener('click', handleOutside)
  onUnmounted(() => document.removeEventListener('click', handleOutside))
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
  transition: backdrop-filter var(--transition), box-shadow var(--transition);
}

.header--scrolled {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 2px 20px rgba(0,0,0,.10);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 4rem;
}

/* Logo */
.header__logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__logo-icon {
  width: 28px;
  height: 28px;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header__logo-text {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: -0.01em;
  white-space: nowrap;
}

/* Nav */
.header__nav {
  flex: 1;
  display: none;
}

.header__nav-list {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.header__nav-link {
  display: block;
  padding: 0.375rem 0.7rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition: color var(--transition), background var(--transition);
  white-space: nowrap;
}

.header__nav-link:hover,
.header__nav-link.router-link-active {
  color: var(--color-primary);
  background: rgba(26, 75, 140, 0.06);
}

/* Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-left: auto;
}

.header__cta {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  display: none;
}

/* Lang selector */
.lang-selector {
  position: relative;
}

.lang-selector__trigger {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition), color var(--transition);
}

.lang-selector__trigger:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.lang-selector__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 140px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  z-index: 200;
}

.lang-selector__option {
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--color-text);
  transition: background var(--transition);
}

.lang-selector__option:hover {
  background: var(--color-bg);
  color: var(--color-primary);
}

.lang-selector__option--active {
  color: var(--color-primary);
  font-weight: 600;
}

/* Burger */
.header__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.header__burger span {
  display: block;
  height: 2px;
  background: var(--color-dark);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
}

.header__burger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.header__burger--open span:nth-child(2) {
  opacity: 0;
}
.header__burger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu */
.header__mobile-menu {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 1.5rem var(--container-padding);
}

.header__mobile-menu ul {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
}

.header__mobile-menu a {
  display: block;
  padding: 0.6rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition: background var(--transition), color var(--transition);
}

.header__mobile-menu a:hover {
  background: var(--color-bg);
  color: var(--color-primary);
}

.header__mobile-langs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.header__mobile-lang {
  padding: 0.3rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text);
  transition: background var(--transition), color var(--transition);
}

.header__mobile-lang--active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

/* Responsive */
@media (min-width: 640px) {
  .header__cta { display: inline-flex; }
}

@media (min-width: 768px) {
  .header__nav { display: block; }
  .header__burger { display: none; }
}

</style>
