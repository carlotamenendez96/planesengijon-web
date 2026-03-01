<template>
  <div class="home">
    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 1 — HERO
    ═══════════════════════════════════════════════════════════ -->
    <section class="hero" aria-label="Cabecera principal">
      <div class="hero__bg" aria-hidden="true">
        <img
          :src="heroImage"
          alt="Playa de San Lorenzo, Gijón"
          class="hero__bg-img"
          width="1920"
          height="1080"
          fetchpriority="high"
        />
        <div class="hero__bg-overlay"></div>
      </div>

      <div class="container hero__content">
        <span class="hero__badge">{{ $t('home.hero_badge') }}</span>
        <h1 class="hero__title">{{ $t('home.hero_title') }}</h1>
        <p class="hero__subtitle">{{ $t('home.hero_subtitle') }}</p>

        <div class="hero__ctas">
          <NuxtLink :to="localePath('/itinerarios/3-dias')" class="btn btn-primary">
            {{ $t('home.cta_itinerary') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/playas')" class="btn btn-outline-white">
            {{ $t('home.cta_beaches') }}
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- Quick links SEO — debajo del hero -->
    <div class="hero-quicklinks-bar">
      <nav class="container hero-quicklinks-bar__inner" aria-label="Guías populares sobre Gijón">
        <NuxtLink
          v-for="link in heroQuickLinks"
          :key="link.key"
          :to="localePath(link.to)"
          class="hero-quicklink-pill"
        >
          <span class="hero-quicklink-pill__icon" aria-hidden="true">{{ link.icon }}</span>
          {{ $t(`quickLinks.${link.key}`) }}
        </NuxtLink>
      </nav>
    </div>

    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 2 — TEMPORADAS
    ═══════════════════════════════════════════════════════════ -->
    <section class="section seasons-section">
      <div class="container">
        <div class="section-header">
          <div class="section-accent-line" aria-hidden="true"></div>
          <h2 class="section-title">{{ $t('home.seasons_title') }}</h2>
          <p class="section-subtitle">{{ $t('home.seasons_subtitle') }}</p>
        </div>

        <div class="seasons-grid">
          <article
            v-for="season in seasons"
            :key="season.slug"
            class="season-card"
          >
            <div class="season-card__img-wrap">
              <img
                :src="season.image"
                :alt="season.label"
                class="season-card__img"
                loading="lazy"
                width="400"
                height="300"
              />
              <div class="season-card__overlay" aria-hidden="true"></div>
            </div>
            <div class="season-card__body">
              <SeasonBadge :season="season.slug as 'verano' | 'otono' | 'invierno' | 'primavera'" :label="season.label" />
              <p class="season-card__months">{{ season.months }}</p>
              <h3 class="season-card__title">{{ season.label }}</h3>
              <p class="season-card__description">{{ season.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 3 — ITINERARIOS
    ═══════════════════════════════════════════════════════════ -->
    <section id="itinerarios" class="section itineraries-section">
      <div class="container">
        <div class="section-header">
          <div class="section-accent-line" aria-hidden="true"></div>
          <h2 class="section-title">{{ $t('home.itineraries_title') }}</h2>
          <p class="section-subtitle">{{ $t('home.itineraries_subtitle') }}</p>
        </div>

        <div class="grid-3">
          <ItineraryCard
            v-for="item in itinerarios"
            :key="item.id"
            :title="item.title || ''"
            :slug="item.slug || String(item.id)"
            :duration="item.duration_days"
            :difficulty="item.difficulty"
            :is-featured="item.is_featured"
            :image-url="getStrapiImage(item)"
            :description="item.description"
          />
        </div>

        <div v-if="!itinerarios.length" class="fallback-grid grid-3">
          <ItineraryCard
            v-for="fb in fallbackItinerarios"
            :key="fb.slug"
            v-bind="fb"
          />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 4 — CON QUIÉN VIENES
    ═══════════════════════════════════════════════════════════ -->
    <section class="section travel-with-section">
      <div class="container">
        <div class="section-header">
          <div class="section-accent-line" aria-hidden="true"></div>
          <h2 class="section-title">{{ $t('home.travelers_title') }}</h2>
          <p class="section-subtitle">{{ $t('home.travelers_subtitle') }}</p>
        </div>

        <div class="scroll-x">
          <div class="travel-with-pills">
            <button
              v-for="profile in travelProfiles"
              :key="profile.key"
              class="travel-pill"
              :class="{ 'travel-pill--active': activeProfile === profile.key }"
              @click="activeProfile = profile.key"
            >
              <span class="travel-pill__emoji" aria-hidden="true">{{ profile.emoji }}</span>
              <span>{{ $t(`travelers.${profile.key}`) }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 5 — PLAYAS
    ═══════════════════════════════════════════════════════════ -->
    <section id="playas" class="section beaches-section">
      <div class="container">
        <div class="section-header-row">
          <div>
            <div class="section-accent-line" aria-hidden="true"></div>
            <h2 class="section-title">{{ $t('home.beaches_title') }}</h2>
            <p class="section-subtitle">{{ $t('home.beaches_subtitle') }}</p>
          </div>
          <NuxtLink :to="localePath('/playas')" class="section-more-link">
            {{ $t('home.see_more') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="beaches-grid">
          <BeachCard
            v-for="beach in playas"
            :key="beach.id"
            :name="beach.name || ''"
            :slug="beach.slug"
            :municipality="beach.municipality"
            :drive-minutes="beach.drive_minutes"
            :image-url="getStrapiImage(beach)"
            :tags="getStrapiTags(beach)"
          />
        </div>

        <div v-if="!playas.length" class="beaches-grid">
          <BeachCard
            v-for="fb in fallbackPlayas"
            :key="fb.name"
            v-bind="fb"
          />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 6 — RESTAURANTES
    ═══════════════════════════════════════════════════════════ -->
    <section id="restaurantes" class="section restaurants-section">
      <div class="container">
        <div class="section-header-row">
          <div>
            <div class="section-accent-line" aria-hidden="true"></div>
            <h2 class="section-title">{{ $t('home.food_title') }}</h2>
            <p class="section-subtitle">{{ $t('home.food_subtitle') }}</p>
          </div>
          <NuxtLink :to="localePath('/gastronomia')" class="section-more-link">
            {{ $t('home.see_more') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="grid-4">
          <RestaurantCard
            v-for="rest in restaurantes"
            :key="rest.id"
            :name="rest.name || ''"
            :slug="rest.slug"
            :cuisine-type="rest.cuisine_type"
            :price-range="rest.price_range"
            :is-featured="rest.is_featured"
            :editorial-note="rest.editorial_note"
            :image-url="getStrapiImage(rest)"
            :tags="getStrapiTags(rest)"
          />
        </div>

        <div v-if="!restaurantes.length" class="grid-4">
          <RestaurantCard
            v-for="fb in fallbackRestaurants"
            :key="fb.name"
            v-bind="fb"
          />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 7 — BLOQUE SEO EDITORIAL
    ═══════════════════════════════════════════════════════════ -->
    <section class="section seo-section" aria-label="Guía editorial">
      <div class="container">
        <div class="seo-block">
          <div class="section-accent-line" aria-hidden="true"></div>
          <h2 class="seo-block__title">{{ $t('seo.title') }}</h2>
          <p class="seo-block__intro">{{ $t('seo.intro') }}</p>

          <h3 class="seo-block__subtitle">{{ $t('seo.mustSee') }}</h3>
          <ul class="seo-block__list" role="list">
            <li v-for="(item, i) in seoMustSeeList" :key="i" class="seo-block__list-item">
              <span class="seo-block__list-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              {{ item }}
            </li>
          </ul>

          <h3 class="seo-block__subtitle">{{ $t('seo.gastroTitle') }}</h3>
          <p>{{ $t('seo.gastroText') }}</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECCIÓN 8 — FAQ ACCORDION
    ═══════════════════════════════════════════════════════════ -->
    <section id="faq" class="section faq-section" aria-labelledby="faq-title">
      <div class="container">
        <div class="section-header">
          <div class="section-accent-line" aria-hidden="true"></div>
          <h2 id="faq-title" class="section-title">{{ $t('home.faq_title') }}</h2>
        </div>

        <div class="faq-list" role="list">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.id || index"
            class="faq-item"
            role="listitem"
          >
            <button
              class="faq-question"
              :aria-expanded="openFaq === index"
              :aria-controls="`faq-answer-${index}`"
              @click="openFaq = openFaq === index ? null : index"
            >
              <span>{{ faq.question }}</span>
              <span class="faq-icon" aria-hidden="true">
                <svg v-if="openFaq !== index" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </span>
            </button>
            <div
              :id="`faq-answer-${index}`"
              class="faq-answer"
              :class="{ 'faq-answer--open': openFaq === index }"
              role="region"
            >
              <div class="faq-answer__inner">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="!faqs.length" class="faq-list" role="list">
          <div
            v-for="(faq, index) in fallbackFaqs"
            :key="index"
            class="faq-item"
            role="listitem"
          >
            <button
              class="faq-question"
              :aria-expanded="openFaq === index"
              :aria-controls="`faq-fb-answer-${index}`"
              @click="openFaq = openFaq === index ? null : index"
            >
              <span>{{ faq.question }}</span>
              <span class="faq-icon" aria-hidden="true">
                <svg v-if="openFaq !== index" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </span>
            </button>
            <div
              :id="`faq-fb-answer-${index}`"
              class="faq-answer"
              :class="{ 'faq-answer--open': openFaq === index }"
              role="region"
            >
              <div class="faq-answer__inner">{{ faq.answer }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  fallbackItinerarios,
  fallbackPlayas,
  fallbackRestaurants,
  fallbackFaqs,
} from '~/composables/useHomeData'

const { t, tm, locale } = useI18n()
const localePath = useLocalePath()
const { getStrapiImage, getStrapiTags } = useStrapiHelpers()

/* ── useHead ─────────────────────────────────────────── */
useHead({
  title: 'Planes en Gijón 2026 | Qué hacer, ver y comer — Guía local',
  meta: [
    { name: 'description', content: 'Descubre los mejores planes en Gijón para cada temporada: playas, rutas, restaurantes y escapadas cercanas. Guía actualizada y con criterio local.' },
    { property: 'og:title', content: 'Planes en Gijón: qué hacer todo el año' },
    { property: 'og:description', content: 'Guía local actualizada 2026 con los mejores planes, restaurantes y escapadas desde Gijón.' },
    { property: 'og:type', content: 'website' },
  ],
})

/* ── Datos desde Strapi (SSR) ────────────────────────── */
const { itinerarios, playas, restaurantes, faqs } = await useHomeData(locale.value)

/* ── Schema FAQ JSON-LD ─────────────────────────────── */
if (faqs.length) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }),
      },
    ],
  })
}

/* ── Hero quick links ────────────────────────────────── */
const heroQuickLinks = [
  { key: 'days2',   icon: '📋', to: '/itinerarios/gijon-en-2-dias' },
  { key: 'summer',  icon: '☀️', to: '/que-hacer-en-gijon-en-verano' },
  { key: 'beaches', icon: '🏖️', to: '/playas-cerca-de-gijon' },
]

/* ── Accordion ───────────────────────────────────────── */
const openFaq = ref<number | null>(null)

/* ── Imágenes (usar /img/... cuando existan en public/img/) ─ */
const heroImage = '/img/hero-san-lorenzo.webp'

const seasonImages: Record<string, string> = {
  verano:    '/img/verano.webp',
  otono:     '/img/otono.webp',
  invierno:  '/img/invierno.webp',
  primavera: '/img/primavera.webp',
}

/* ── Datos estáticos ─────────────────────────────────── */
const seasons = [
  {
    label: t('seasons.summer.label'),
    months: t('seasons.summer.months'),
    emoji: '☀️',
    description: t('seasons.summer.description'),
    slug: 'verano',
    image: seasonImages.verano,
  },
  {
    label: t('seasons.autumn.label'),
    months: t('seasons.autumn.months'),
    emoji: '🍂',
    description: t('seasons.autumn.description'),
    slug: 'otono',
    image: seasonImages.otono,
  },
  {
    label: t('seasons.winter.label'),
    months: t('seasons.winter.months'),
    emoji: '🌊',
    description: t('seasons.winter.description'),
    slug: 'invierno',
    image: seasonImages.invierno,
  },
  {
    label: t('seasons.spring.label'),
    months: t('seasons.spring.months'),
    emoji: '🌿',
    description: t('seasons.spring.description'),
    slug: 'primavera',
    image: seasonImages.primavera,
  },
]

const travelProfiles = [
  { key: 'romantic', emoji: '💑' },
  { key: 'friends', emoji: '👥' },
  { key: 'dog', emoji: '🐶' },
  { key: 'kids', emoji: '👨‍👩‍👧' },
  { key: 'rain', emoji: '🌧️' },
]
const activeProfile = ref<string | null>(null)

// tm() devuelve el valor raw del mensaje (array, objeto o string)
const seoMustSeeList = computed((): string[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list: any = tm('seo.mustSeeList')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Array.isArray(list) ? list.map((item: any) => String(item)) : []
})
</script>

<style scoped>
/* ─── HERO ──────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 85vh;
  display: grid;
  place-items: center;
  text-align: center;
  color: #fff;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero__bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(17,24,39,.5) 0%, rgba(17,24,39,.7) 100%);
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-block: 6rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 860px;
}

.hero__badge {
  display: inline-block;
  background: rgba(232, 160, 32, 0.25);
  border: 1px solid rgba(232, 160, 32, 0.5);
  color: #f5c55a;
  padding: 0.3rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(1.875rem, 5vw, 3.25rem);
  color: #fff;
  line-height: 1.15;
  max-width: 780px;
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255,255,255,.8);
  max-width: 560px;
  line-height: 1.6;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.875rem;
  margin-top: 0.5rem;
}

/* ─── BARRA QUICK LINKS (bajo el hero) ───────────────── */
.hero-quicklinks-bar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding-block: 0.875rem;
}

.hero-quicklinks-bar__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
}

.hero-quicklink-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text);
  transition: background var(--transition), border-color var(--transition), color var(--transition), box-shadow var(--transition);
  white-space: nowrap;
}

.hero-quicklink-pill:hover {
  background: var(--color-surface);
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.hero-quicklink-pill__icon {
  font-size: 0.875rem;
  line-height: 1;
}

/* ─── TEMPORADAS ─────────────────────────────────────── */
.seasons-section {
  background: var(--color-bg);
}

.seasons-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .seasons-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .seasons-grid { grid-template-columns: repeat(4, 1fr); }
}

.season-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition), transform var(--transition);
}

.season-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.season-card__img-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.season-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.season-card:hover .season-card__img {
  transform: scale(1.05);
}

.season-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17,24,39,.5), transparent 70%);
}

.season-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.season-card__months {
  font-size: 0.8rem;
  color: var(--color-muted);
  font-weight: 500;
}

.season-card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-dark);
}

.season-card__description {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.6;
  margin-top: 0.25rem;
}

/* ─── ITINERARIOS ────────────────────────────────────── */
.itineraries-section {
  background: var(--color-surface);
}

/* ─── CON QUIÉN VIENES ───────────────────────────────── */
.travel-with-section {
  background: var(--color-bg);
}

.travel-with-pills {
  display: flex;
  gap: 0.875rem;
  padding-bottom: 0.5rem;
  min-width: max-content;
}

.travel-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--transition), border-color var(--transition), color var(--transition), box-shadow var(--transition);
}

.travel-pill:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.travel-pill--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-md);
}

.travel-pill__emoji {
  font-size: 1.125rem;
  line-height: 1;
}

/* ─── PLAYAS ─────────────────────────────────────────── */
.beaches-section {
  background: var(--color-dark);
  color: #fff;
}

.beaches-section .section-title { color: #fff; }
.beaches-section .section-subtitle { color: rgba(255,255,255,.6); }
.beaches-section .section-accent-line { background: var(--color-accent); }

.beaches-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .beaches-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .beaches-grid { grid-template-columns: repeat(3, 1fr); }
}

.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.section-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
  transition: gap var(--transition);
  white-space: nowrap;
  flex-shrink: 0;
}

.section-more-link:hover { gap: 0.6rem; }

/* ─── RESTAURANTES ───────────────────────────────────── */
.restaurants-section {
  background: var(--color-bg);
}

/* ─── SEO EDITORIAL ──────────────────────────────────── */
.seo-section {
  background: #F3F4F6;
}

.seo-block {
  max-width: 800px;
  margin-inline: auto;
}

.seo-block__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: var(--color-dark);
  margin-bottom: 1.25rem;
  margin-top: 1rem;
}

.seo-block__intro {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.seo-block__subtitle {
  font-family: var(--font-display);
  font-size: 1.375rem;
  color: var(--color-dark);
  margin-bottom: 1rem;
  margin-top: 1.75rem;
}

.seo-block__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.seo-block__list-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text);
}

.seo-block__list-icon {
  flex-shrink: 0;
  margin-top: 0.2rem;
  color: var(--color-primary);
}

/* ─── FAQ ────────────────────────────────────────────── */
.faq-section {
  background: var(--color-surface);
}

.faq-list {
  max-width: 760px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-item:first-child {
  border-top: 1px solid var(--color-border);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 0;
  background: none;
  border: none;
  text-align: left;
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-dark);
  cursor: pointer;
  transition: color var(--transition);
}

.faq-question:hover { color: var(--color-primary); }

.faq-icon {
  flex-shrink: 0;
  color: var(--color-primary);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease;
}

.faq-answer--open {
  max-height: 600px;
}

.faq-answer__inner {
  padding-bottom: 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--color-text);
}
</style>
