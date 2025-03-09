import { useMutation } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { MutationConfig } from 'src/lib/react-query'

type Provider = 'google.com' | 'github.com'

export type GetOauthLinkDTO = {
  data: {
    provider: Provider
    state: string
  }
}
const getOauthLink = ({ data }: GetOauthLinkDTO): Promise<{ authLink: string }> => {
  return axios.post('/engine/auth/auth_link', data)
}

type QueryFnType = typeof getOauthLink

type UseGetArticlesOptions = {
  config?: MutationConfig<QueryFnType>
}

export const useGetOauthLink = ({ config }: UseGetArticlesOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: getOauthLink,
  })
}
