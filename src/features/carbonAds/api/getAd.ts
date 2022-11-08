import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query';
import { Ad } from "../types";
import { axios } from 'src/lib/axios';

type Response = {
  ads: Ad[]
}

const getAd = async (): Promise<Ad | null> => {
  const userAgent = new URLSearchParams(navigator.userAgent).toString()

  return axios.get<Ad | null>('/monetization/', {
    params: {
      useragent: userAgent
    }
  }).then(response => {
    const data = response as unknown as Response;
    if (!!data.ads.length) {
      return data.ads[0];
    } 
    return null;
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