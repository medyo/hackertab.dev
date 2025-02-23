import { useMutation } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { MutationConfig } from 'src/lib/react-query'
import { Hit } from '../types'

type DTOProps = {
  data: {
    type: 'visit'
  }
}
const postHit = async ({ data }: DTOProps): Promise<Hit> => {
  return axios.post('/engine/hit', data)
}

type QueryFnType = typeof postHit

type UsePostHitOptions = {
  config?: MutationConfig<QueryFnType>
}
export const usePostHit = ({ config }: UsePostHitOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: postHit,
  })
}
