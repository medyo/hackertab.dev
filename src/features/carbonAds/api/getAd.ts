import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query';
import { Ad } from "../types";
import { axios } from 'src/lib/axios';

const getAd = async (): Promise<Ad> => {
  const userAgent = new URLSearchParams(navigator.userAgent).toString()

  return axios.get('/monetization/', {
    params: {
      useragent: userAgent
    }
  }).then(response => {
    if (response.data?.ads?.length) {
      return response.data.ads[0];
    }
  });
}

type QueryFnType = typeof getAd;

type UseGetAdOptions = {
  config?: QueryConfig<QueryFnType>;
};
export const useGetAd = ({ config }: UseGetAdOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ad'],
    queryFn: () => getAd(),
  });
}