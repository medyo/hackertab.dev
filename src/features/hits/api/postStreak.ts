import { useMutation } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { MutationConfig } from 'src/lib/react-query'
import { Streak } from '../types'

const postStreak = async (): Promise<Streak> => {
  return axios.post('/engine/user/streak', {})
}

type UsePostStreakOptions = {
  config?: MutationConfig<typeof postStreak>
}
export const usePostStreak = ({ config }: UsePostStreakOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: postStreak,
  })
}
