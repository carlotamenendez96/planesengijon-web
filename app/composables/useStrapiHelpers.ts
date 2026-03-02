import type { StrapiTag } from '~/types/strapi'

export const useStrapiHelpers = () => {
  const { getImageUrl } = useStrapi()

  /**
   * Extrae los nombres de los tags de un item de Strapi.
   * Compatible con Strapi v5 (estructura plana).
   */
  const getStrapiTags = (item: unknown): string[] => {
    const i = item as Record<string, unknown>
    const raw = i?.tags

    if (!raw || !Array.isArray(raw)) return []

    return (raw as StrapiTag[])
      .map((t) => t?.name)
      .filter((v): v is string => typeof v === 'string' && v.length > 0)
  }

  return { getImageUrl, getStrapiTags }
}
