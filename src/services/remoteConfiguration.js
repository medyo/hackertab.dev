import cachedRequest from './cachedRequest';

const getRemoteConfiguration = async () => {
  const url = `/data/remoteConfiguration.json`;
  const data = await cachedRequest(url, maxAge = 60);
  return data;
}

export default {
    getRemoteConfiguration: getRemoteConfiguration,
}
