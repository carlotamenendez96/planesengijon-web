import type {
  StrapiItinerary,
  StrapiBeach,
  StrapiRestaurant,
  StrapiFaq,
} from '~/types/strapi'

/** Nuxt usa 'es'/'it', Strapi registra 'es-ES'/'it-IT' */
const STRAPI_LOCALE: Record<string, string> = {
  es: 'es-ES',
  it: 'it-IT',
}
const toStrapiLocale = (nuxtLocale: string) => STRAPI_LOCALE[nuxtLocale] ?? nuxtLocale

export const useHomeData = async (locale: string) => {
  const { find } = useStrapi()
  const sl = toStrapiLocale(locale)

  let itinerarios: StrapiItinerary[] = []
  let playas: StrapiBeach[] = []
  let restaurantes: StrapiRestaurant[] = []
  let faqs: StrapiFaq[] = []

  try {
    const res = await find<StrapiItinerary>('itineraries', {
      locale: sl,
      'filters[is_featured]': 'true',
      'populate[0]': 'cover_image',
      'pagination[limit]': '3',
    })
    itinerarios = res?.data ?? []
  } catch { itinerarios = [] }

  try {
    const res = await find<StrapiBeach>('beaches', {
      locale: sl,
      'filters[location_type]': 'escapada',
      'populate[0]': 'cover_image',
      'populate[1]': 'tags',
      'pagination[limit]': '3',
    })
    playas = res?.data ?? []
  } catch { playas = [] }

  try {
    const res = await find<StrapiRestaurant>('restaurants', {
      locale: sl,
      'populate[0]': 'cover_image',
      'populate[1]': 'categories',
      'populate[2]': 'tags',
      sort: 'is_featured:desc',
      'pagination[limit]': '4',
    })
    restaurantes = res?.data ?? []
  } catch { restaurantes = [] }

  try {
    const res = await find<StrapiFaq>('faqs', {
      locale: sl,
      'filters[is_active]': 'true',
      'filters[page_context][$in][0]': 'home',
      'filters[page_context][$in][1]': 'global',
      sort: 'sort_order:asc',
    })
    faqs = res?.data ?? []
  } catch { faqs = [] }

  return { itinerarios, playas, restaurantes, faqs }
}
