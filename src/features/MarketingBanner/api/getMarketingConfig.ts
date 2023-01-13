import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query';
import { MarketingConfig } from "../types";
import { axios } from 'src/lib/axios';

const getMarketingConfig = async (): Promise<MarketingConfig> => {
  return axios.get('/data/marketingConfig.json');
}

type QueryFnType = typeof getMarketingConfig;

type UseGetMarketingConfigOptions = {
  config?: QueryConfig<QueryFnType>;
};
export const useGetMarketingConfig = ({ config }: UseGetMarketingConfigOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['marketing-config'],
    queryFn: () => getMarketingConfig(),
  });
}