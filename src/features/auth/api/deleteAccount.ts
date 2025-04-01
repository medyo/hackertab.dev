import { useMutation } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { MutationConfig } from 'src/lib/react-query'

type DeleteAccountDTO = {
  userId: string
}
const deleteAccount = ({ userId }: DeleteAccountDTO): Promise<{ authLink: string }> => {
  return axios.delete(`/engine/user/${userId}`, {})
}

type QueryFnType = typeof deleteAccount

type UseGetArticlesOptions = {
  config?: MutationConfig<QueryFnType>
}

export const useDeleteAccount = ({ config }: UseGetArticlesOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: deleteAccount,
  })
}
