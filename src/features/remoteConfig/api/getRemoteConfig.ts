import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query';
import { RemoteConfig } from "../types";
import { axios } from 'src/lib/axios';

const getAd = async (): Promise<RemoteConfig> => {
  return axios.get('/data/remoteConfiguration.json');
}

type QueryFnType = typeof getAd;

type UseGetAdOptions = {
  config?: QueryConfig<QueryFnType>;
};
export const useGetRemoteConfig = ({ config }: UseGetAdOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['remote-config'],
    queryFn: () => getAd(),
  });
}