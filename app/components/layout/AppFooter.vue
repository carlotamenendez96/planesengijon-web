<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__top">
        <!-- Brand -->
        <div class="footer__brand">
          <NuxtLink :to="localePath('/')" class="footer__logo" aria-label="Planes en Gijón">
            Planes en Gijón
          </NuxtLink>
          <p class="footer__tagline">{{ $t('footer.tagline') }}</p>
          <div class="footer__accent-line"></div>
        </div>

        <!-- Columna: Explora -->
        <nav class="footer__col" aria-label="Explorar">
          <h3 class="footer__col-title">{{ $t('footer.explore') }}</h3>
          <ul role="list">
            <li><NuxtLink :to="localePath('/itinerarios')" class="footer__link">{{ $t('footer.links.itineraries') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/playas')" class="footer__link">{{ $t('footer.links.beaches') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/gastronomia')" class="footer__link">{{ $t('footer.links.restaurants') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/escapadas')" class="footer__link">{{ $t('footer.links.nearEscapes') }}</NuxtLink></li>
          </ul>
        </nav>

        <!-- Columna: Guías Prácticas -->
        <nav class="footer__col" aria-label="Guías prácticas">
          <h3 class="footer__col-title">{{ $t('footer.guides') }}</h3>
          <ul role="list">
            <li><NuxtLink :to="localePath('/como-llegar')" class="footer__link">{{ $t('footer.links.howToArrive') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/alojamiento')" class="footer__link">{{ $t('footer.links.whereToStay') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/transporte')" class="footer__link">{{ $t('footer.links.transport') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/presupuesto')" class="footer__link">{{ $t('footer.links.budget') }}</NuxtLink></li>
          </ul>
        </nav>

        <!-- Columna: Legal -->
        <nav class="footer__col" aria-label="Legal">
          <h3 class="footer__col-title">{{ $t('footer.legal') }}</h3>
          <ul role="list">
            <li><NuxtLink :to="localePath('/privacidad')" class="footer__link">{{ $t('footer.links.privacy') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/cookies')" class="footer__link">{{ $t('footer.links.cookies') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contacto')" class="footer__link">{{ $t('footer.links.contact') }}</NuxtLink></li>
          </ul>
        </nav>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; {{ currentYear }} {{ $t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--color-dark);
  color: var(--color-muted);
  padding-top: 4rem;
}

.footer__top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255,255,255,.08);
}

@media (min-width: 640px) {
  .footer__top { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .footer__top { grid-template-columns: 2fr 1fr 1fr 1fr; }
}

/* Brand */
.footer__logo {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 700;
  color: #fff;
  display: block;
  margin-bottom: 0.75rem;
  transition: opacity var(--transition);
}
.footer__logo:hover { opacity: 0.85; }

.footer__tagline {
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 280px;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}

.footer__accent-line {
  width: 2.5rem;
  height: 2px;
  background: var(--color-accent);
  border-radius: var(--radius-pill);
}

/* Columnas nav */
.footer__col-title {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
  margin-bottom: 1.25rem;
}

.footer__col ul {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer__link {
  font-size: 0.9rem;
  color: var(--color-muted);
  transition: color var(--transition);
}
.footer__link:hover { color: #fff; }

/* Bottom */
.footer__bottom {
  padding-block: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer__copyright {
  font-size: 0.8125rem;
  color: rgba(255,255,255,.3);
  text-align: center;
}
</style>
