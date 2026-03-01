/* ─────────────────────────────────────────────────────────────
   Tipos base de la API de Strapi v5
───────────────────────────────────────────────────────────── */

/** Nodo de texto dentro de un bloque de Rich Text (Blocks) */
export interface StrapiRichTextChild {
  type: 'text' | string
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
}

/** Bloque de Rich Text (Blocks) tal como lo devuelve Strapi v5 */
export interface StrapiRichTextBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code' | 'image' | string
  level?: number
  children: StrapiRichTextChild[]
}

export type StrapiRichText = StrapiRichTextBlock[]

export interface StrapiPagination {
  start?: number
  limit?: number
  page?: number
  pageSize?: number
  pageCount?: number
  total: number
}

export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: StrapiPagination
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: Record<string, unknown>
}

/* ─────────────────────────────────────────────────────────────
   Colecciones
───────────────────────────────────────────────────────────── */

/** Tag — manyToMany con Place, Restaurant y Beach */
export interface StrapiTag {
  id: number
  documentId?: string
  name: string
  slug?: string
  emoji?: string
  tag_type?: 'vibe' | 'feature' | 'audience' | string
  color?: string
  description?: string | null
  locale?: string
}

/** Category — manyToMany con Place y Restaurant */
export interface StrapiCategory {
  id: number
  documentId?: string
  name: string
  slug?: string
  description?: string | null
  icon?: string
  sort_order?: number
  is_active?: boolean
  seo_title?: string | null
  seo_description?: string | null
  locale?: string
}

/** ItineraryDay — manyToMany con Place, Restaurant y Beach */
export interface StrapiItineraryDay {
  id: number
  documentId?: string
  day_number: number
  title: string
  description?: string
  morning_tip?: string
  afternoon_tip?: string
  evening_tip?: string
  locale?: string
}

/** Itinerary */
export interface StrapiItinerary {
  id: number
  documentId?: string
  slug: string
  title: string
  description?: StrapiRichText
  excerpt?: string
  duration_days: number
  difficulty: 'easy' | 'medium' | 'hard'
  traveler_type?: 'couple' | 'friends' | 'family' | 'solo' | 'dog' | string
  season?: 'spring' | 'summer' | 'autumn' | 'winter' | 'all_year' | string
  budget_level?: 'low' | 'medium' | 'high' | string
  requires_car?: boolean
  is_featured: boolean
  seo_title?: string
  seo_description?: string
  itinerary_days?: StrapiItineraryDay[]
  locale?: string
}

/** Beach */
export interface StrapiBeach {
  id: number
  documentId?: string
  slug: string
  name: string
  description?: StrapiRichText
  excerpt?: string
  location_type?: 'urban' | 'escapada' | string
  municipality?: string
  distance_from_gijon_km?: number
  drive_time_min?: number
  parking_info?: string
  best_season?: 'spring' | 'summer' | 'autumn' | 'winter' | 'all_year' | string
  crowd_level?: 'low' | 'medium' | 'high' | string
  is_blue_flag?: boolean
  has_lifeguard?: boolean
  has_services?: boolean
  is_dog_friendly?: boolean
  wave_type?: 'surf' | 'calm' | 'mixed' | string
  latitude?: number | null
  longitude?: number | null
  tips?: string
  seo_title?: string
  seo_description?: string
  tags?: StrapiTag[]
  itinerary_days?: StrapiItineraryDay[]
  locale?: string
}

/** Restaurant */
export interface StrapiRestaurant {
  id: number
  documentId?: string
  slug: string
  name: string
  description?: StrapiRichText
  excerpt?: string
  cuisine_type?: string
  price_range?: 'low' | 'medium' | 'high' | 'euro' | string
  address?: string
  phone?: string
  website_url?: string
  booking_url?: string
  featured_badge?: string | null
  is_dog_friendly?: boolean
  has_terrace?: boolean
  is_featured?: boolean
  featured_until?: string | null
  partner_tier?: 'free' | 'basic' | 'premium' | string
  editorial_note?: string
  longitude?: number | null
  latitude?: number | null
  itinerary_days?: StrapiItineraryDay[]
  categories?: StrapiCategory[]
  tags?: StrapiTag[]
  locale?: string
}

/** Place */
export interface StrapiPlace {
  id: number
  documentId?: string
  slug: string
  name: string
  description?: StrapiRichText
  excerpt?: string
  address?: string
  price_range?: string
  latitude?: number | null
  longitude?: number | null
  season?: 'spring' | 'summer' | 'autumn' | 'winter' | 'all_year' | string
  is_free?: boolean
  tips?: string
  is_featured?: boolean
  seo_title?: string
  seo_description?: string
  itinerary_days?: StrapiItineraryDay[]
  categories?: StrapiCategory[]
  tags?: StrapiTag[]
  locale?: string
}

/** FAQ
 *  Nota: el campo `answer` es Rich Text (Blocks) en Strapi.
 *  Para renderizarlo en el acordeón hay que extraer el texto plano
 *  o usar un componente de bloques.
 */
export interface StrapiFaq {
  id: number
  documentId?: string
  question: string
  answer?: StrapiRichText
  sort_order?: number
  page_context: 'home' | 'global' | string
  is_active: boolean
  schema_enabled?: boolean
  locale?: string
}

/* ─────────────────────────────────────────────────────────────
   Utilidad: extrae texto plano de un campo Rich Text (Blocks)
───────────────────────────────────────────────────────────── */
export const richTextToPlain = (blocks?: StrapiRichText): string => {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block) => block.children?.map((c) => c.text).join('') ?? '')
    .join('\n\n')
    .trim()
}
