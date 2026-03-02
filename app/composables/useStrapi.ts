import type { StrapiResponse, StrapiSingleResponse } from '~/types/strapi'

/**
 * Strapi v5 requiere notación de array para parámetros multi-valor.
 * populate=cover_image,tags → populate[0]=cover_image&populate[1]=tags
 * Esta función expande valores separados por comas en claves indexadas.
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

  /**
   * Obtiene la URL de un campo de imagen de Strapi de forma segura.
   * Si la URL es relativa la convierte a absoluta con la base del CMS.
   */
  const getImageUrl = (
    imageField: { url?: string } | null | undefined,
    fallback = '/img/placeholder.webp'
  ): string => {
    if (!imageField?.url) return fallback
    return imageField.url.startsWith('http')
      ? imageField.url
      : `${baseURL}${imageField.url}`
  }

  /**
   * Obtiene el texto alternativo de un campo de imagen de Strapi.
   */
  const getImageAlt = (
    imageField: { alternativeText?: string | null } | null | undefined,
    fallback = ''
  ): string => {
    return imageField?.alternativeText ?? fallback
  }

  /**
   * Extrae texto plano de un campo Rich Text (Blocks) de Strapi v5.
   * Útil para metadatos SEO, resúmenes o cualquier contexto que no admita HTML.
   */
  const renderRichText = (
    blocks: Array<{ children?: Array<{ text?: string }> }> | null | undefined
  ): string => {
    if (!blocks || !Array.isArray(blocks)) return ''
    return blocks
      .map((block) => block.children?.map((c) => c.text ?? '').join('') ?? '')
      .join('\n\n')
      .trim()
  }

  return { find, findOne, getImageUrl, getImageAlt, renderRichText }
}
