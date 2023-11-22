import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { localStorageAdapter } from 'src/adapters/LocalStorageAdapter'
import { PromiseValue } from 'type-fest'

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 3600000, //1 Hour
    cacheTime: 3600000, // 1 Day
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export const persister = createAsyncStoragePersister({
  storage: localStorageAdapter,
})

export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<
  ReturnType<FnType>
>

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>
