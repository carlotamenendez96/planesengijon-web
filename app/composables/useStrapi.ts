import type { StrapiResponse, StrapiSingleResponse } from '~/types/strapi'

/**
 * Strapi v5 requires array notation for multi-value params.
 * e.g. populate: 'cover_image,tags' → populate[0]=cover_image&populate[1]=tags
 * This function expands comma-separated values into indexed keys.
 */
const buildQuery = (params: Record<string, string>): string => {
  const parts: string[] = []

  for (const [key, value] of Object.entries(params)) {
    if (value.includes(',')) {
      value.split(',').forEach((v, i) => {
        parts.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(v.trim())}`)
      })
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }

  return parts.length ? '?' + parts.join('&') : ''
}

export const useStrapi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.strapiUrl

  const find = async <T>(
    contentType: string,
    params?: Record<string, string>
  ): Promise<StrapiResponse<T>> => {
    const query = params ? buildQuery(params) : ''
    return $fetch<StrapiResponse<T>>(`${baseURL}/api/${contentType}${query}`)
  }

  const findOne = async <T>(
    contentType: string,
    id: string,
    params?: Record<string, string>
  ): Promise<StrapiSingleResponse<T>> => {
    const query = params ? buildQuery(params) : ''
    return $fetch<StrapiSingleResponse<T>>(`${baseURL}/api/${contentType}/${id}${query}`)
  }

  return { find, findOne }
}
