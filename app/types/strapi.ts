export interface StrapiImage {
  url: string
  width?: number
  height?: number
  alternativeText?: string
}

export interface StrapiTag {
  id?: number
  name: string
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
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

export interface StrapiItinerary {
  id: number
  slug: string
  title: string
  duration_days: number
  difficulty: 'easy' | 'medium' | 'hard'
  is_featured: boolean
  description?: string
  cover_image?: StrapiImage
  locale?: string
}

export interface StrapiBeach {
  id: number
  slug: string
  name: string
  municipality?: string
  drive_minutes?: number
  location_type?: 'urban' | 'escapada'
  cover_image?: StrapiImage
  tags?: StrapiTag[]
  locale?: string
}

export interface StrapiRestaurant {
  id: number
  slug: string
  name: string
  cuisine_type?: string
  price_range?: 'low' | 'medium' | 'high'
  is_featured?: boolean
  editorial_note?: string
  cover_image?: StrapiImage
  categories?: StrapiTag[]
  tags?: StrapiTag[]
  locale?: string
}

export interface StrapiFaq {
  id: number
  question: string
  answer: string
  is_active: boolean
  page_context: 'home' | 'global' | string
  sort_order?: number
  locale?: string
}

export interface StrapiPlace {
  id: number
  slug: string
  title: string
  description?: string
  category?: string
  cover_image?: StrapiImage
  tags?: StrapiTag[]
  locale?: string
}
