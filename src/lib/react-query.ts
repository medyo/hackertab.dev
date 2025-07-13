import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import {
  DefaultOptions,
  QueryClient,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { localStorageAdapter } from 'src/adapters/LocalStorageAdapter'
import { isDevelopment } from 'src/utils/Environment'
import { PromiseValue } from 'type-fest'

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
    retry: false,
    // Disable cache on dev mode
    staleTime: isDevelopment() ? 0 : 900000, //15 minutes
    cacheTime: isDevelopment() ? 0 : 3600000, // 1 hour
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

export type InfiniteQueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn' | 'getNextPageParam'
>

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>
