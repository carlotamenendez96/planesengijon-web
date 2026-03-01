import type {
  StrapiItinerary,
  StrapiBeach,
  StrapiRestaurant,
  StrapiFaq,
} from '~/types/strapi'

export interface FallbackItinerary {
  title: string
  slug: string
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  isFeatured?: boolean
  description: string
}

export interface FallbackBeach {
  name: string
  municipality: string
  driveMinutes: number
  tags: string[]
}

export interface FallbackRestaurant {
  name: string
  cuisineType: string
  priceRange: 'low' | 'medium' | 'high'
  isFeatured?: boolean
  editorialNote: string
}

export interface FallbackFaq {
  question: string
  answer: string
}

export const fallbackItinerarios: FallbackItinerary[] = [
  { title: 'Gijón en 3 días: lo esencial', slug: '3-dias-gijon', duration: 3, difficulty: 'easy', isFeatured: true, description: 'El mejor itinerario para una primera visita a Gijón.' },
  { title: 'Ruta gastronómica por Cimadevilla', slug: 'ruta-gastronomica', duration: 1, difficulty: 'easy', description: 'Sidrerías, pinchazos y tapas en el barrio más auténtico.' },
  { title: 'Gijón con niños: planes en familia', slug: 'gijon-familias', duration: 2, difficulty: 'easy', description: 'La ciudad más divertida para los más pequeños de la casa.' },
]

export const fallbackPlayas: FallbackBeach[] = [
  { name: 'Playa de Rodiles', municipality: 'Villaviciosa', driveMinutes: 29, tags: ['surf', 'natural'] },
  { name: 'Playa de Torimbia', municipality: 'Llanes', driveMinutes: 45, tags: ['nudista', 'virgen'] },
  { name: 'Playa de Luces', municipality: 'Caravia', driveMinutes: 40, tags: ['familiar', 'tranquila'] },
]

export const fallbackRestaurants: FallbackRestaurant[] = [
  { name: 'El Molinón', cuisineType: 'Asturiana', priceRange: 'medium', isFeatured: true, editorialNote: 'La mejor fabada de Gijón, sin discusión.' },
  { name: 'Sidrería La Galana', cuisineType: 'Sidrería', priceRange: 'low', editorialNote: 'Ambiente auténtico y sidra natural de primera.' },
  { name: 'Ciudadela', cuisineType: 'Cocina de mercado', priceRange: 'high', isFeatured: true, editorialNote: 'Alta cocina asturiana con producto de temporada.' },
  { name: 'Casa Zabala', cuisineType: 'Marisquería', priceRange: 'high', editorialNote: 'Marisco del Cantábrico en estado puro.' },
]

export const fallbackFaqs: FallbackFaq[] = [
  { question: '¿Cuál es la mejor época para visitar Gijón?', answer: 'Gijón es visitable todo el año, pero julio y agosto son los meses de playa por excelencia, con temperaturas entre 20-25°C. Si prefieres la ciudad sin multitudes, septiembre y junio son meses ideales: buen tiempo y mucha menos gente.' },
  { question: '¿Qué ver en Gijón en 2 días?', answer: 'En 2 días puedes recorrer lo esencial: la Playa de San Lorenzo, el barrio de Cimadevilla con el puerto deportivo, el Elogio del Horizonte de Chillida, el Jardín Botánico y terminar con una cena de sidra y cachopo en alguna sidrería tradicional.' },
  { question: '¿Cómo llegar a Gijón desde Madrid?', answer: 'La opción más cómoda es el tren AVE/Alvia desde Madrid-Chamartín, con frecuencias diarias y un trayecto de aproximadamente 4h30. También hay conexiones en autobús (Alsa) y vuelos al aeropuerto de Asturias, a 45 minutos de Gijón en coche.' },
  { question: '¿Es Gijón una ciudad cara para el turista?', answer: 'Gijón es considerablemente más asequible que las grandes ciudades turísticas españolas. Un menú del día completo cuesta entre 12-15€, el alojamiento en hotel urbano entre 60-100€ por noche, y las sidrerías ofrecen tapas y bebida por menos de 20€ por persona.' },
]

export const useHomeData = async (locale: string) => {
  const { find } = useStrapi()

  let itinerarios: StrapiItinerary[] = []
  let playas: StrapiBeach[] = []
  let restaurantes: StrapiRestaurant[] = []
  let faqs: StrapiFaq[] = []

  try {
    const res = await find<StrapiItinerary>('itineraries', {
      locale,
      'filters[is_featured]': 'true',
      populate: 'cover_image',
      'pagination[limit]': '3',
    })
    itinerarios = res?.data ?? []
  } catch { itinerarios = [] }

  try {
    const res = await find<StrapiBeach>('beaches', {
      locale,
      'filters[location_type]': 'escapada',
      populate: 'cover_image,tags',
      'pagination[limit]': '3',
    })
    playas = res?.data ?? []
  } catch { playas = [] }

  try {
    const res = await find<StrapiRestaurant>('restaurants', {
      locale,
      populate: 'cover_image,categories,tags',
      sort: 'is_featured:desc',
      'pagination[limit]': '4',
    })
    restaurantes = res?.data ?? []
  } catch { restaurantes = [] }

  try {
    const res = await find<StrapiFaq>('faqs', {
      locale,
      'filters[is_active]': 'true',
      'filters[page_context][$in][0]': 'home',
      'filters[page_context][$in][1]': 'global',
      sort: 'sort_order:asc',
    })
    faqs = res?.data ?? []
  } catch { faqs = [] }

  return { itinerarios, playas, restaurantes, faqs }
}
