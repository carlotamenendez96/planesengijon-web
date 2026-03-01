import type { StrapiResponse, StrapiSingleResponse } from '~/types/strapi'

export const useStrapi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.strapiUrl

  const find = async <T>(
    contentType: string,
    params?: Record<string, string>
  ): Promise<StrapiResponse<T>> => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return $fetch<StrapiResponse<T>>(`${baseURL}/api/${contentType}${query}`)
  }

  const findOne = async <T>(
    contentType: string,
    id: string,
    params?: Record<string, string>
  ): Promise<StrapiSingleResponse<T>> => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return $fetch<StrapiSingleResponse<T>>(`${baseURL}/api/${contentType}/${id}${query}`)
  }

  return { find, findOne }
}
