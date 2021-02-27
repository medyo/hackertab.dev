import useRemoteConfiguration from './useRemoteConfiguration';
import { ConfigurationProvider } from './ConfigurationContext';
import { LOCAL_CONFIGURATION } from '../Constants';


export default function ConfigurationWrapper({ children }) {
  const [configuration, loadingConfiguration, errorConfiguration] = useRemoteConfiguration();
  if (loadingConfiguration) {
    return <h1>Loading ....</h1>
  }

  const getConfiguration = () => errorConfiguration ? LOCAL_CONFIGURATION : configuration

  return (
    <ConfigurationProvider value={getConfiguration()}>
      {children}
    </ConfigurationProvider>
  )

}