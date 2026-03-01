export const useStrapi = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.strapiUrl
  
    const find = async (contentType: string, params?: Record<string, any>) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : ''
      const data = await $fetch(`${baseURL}/api/${contentType}${query}`)
      return data
    }
  
    const findOne = async (contentType: string, id: string, params?: Record<string, any>) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : ''
      const data = await $fetch(`${baseURL}/api/${contentType}/${id}${query}`)
      return data
    }
  
    return { find, findOne }
  }