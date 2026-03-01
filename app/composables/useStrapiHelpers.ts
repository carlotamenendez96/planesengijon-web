export const useStrapiHelpers = () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapiUrl

  const getStrapiImage = (item: unknown): string | undefined => {
    const i = item as Record<string, unknown>
    const coverImage = i?.cover_image as Record<string, unknown> | undefined
    const attributes = i?.attributes as Record<string, unknown> | undefined

    const url: string | undefined =
      coverImage?.url as string | undefined ||
      (attributes?.cover_image as Record<string, unknown>)?.data?.attributes?.url as string | undefined ||
      coverImage?.data?.attributes?.url as string | undefined

    if (!url) return undefined
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }

  const getStrapiTags = (item: unknown): string[] => {
    const i = item as Record<string, unknown>
    const attributes = i?.attributes as Record<string, unknown> | undefined

    const raw: unknown =
      i?.tags ||
      (attributes?.tags as Record<string, unknown>)?.data ||
      attributes?.tags

    if (!raw || !Array.isArray(raw)) return []

    return (raw as unknown[])
      .map((t) => {
        if (typeof t === 'string') return t
        const tag = t as Record<string, unknown>
        return (tag?.name as string | undefined) || ((tag?.attributes as Record<string, unknown>)?.name as string | undefined)
      })
      .filter((v): v is string => typeof v === 'string' && v.length > 0)
  }

  return { getStrapiImage, getStrapiTags }
}
