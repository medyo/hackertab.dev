import useRemoteConfiguration from './useRemoteConfiguration';
import { ConfigurationProvider } from './ConfigurationContext';
import { LOCAL_CONFIGURATION } from '../Constants';
import BeatLoader from "react-spinners/BeatLoader";
import AppWrapper from './AppWrapper'

export default function ConfigurationWrapper({ children }) {
  const [configuration, loadingConfiguration, errorConfiguration] = useRemoteConfiguration()
  if (loadingConfiguration) {
    return (
      <div className="appLoading">
        <BeatLoader color={'#A9B2BD'} loading={true} size={15} />
      </div>
    )
  }

  const getConfiguration = () => (errorConfiguration ? LOCAL_CONFIGURATION : configuration)

  return (
    <ConfigurationProvider value={getConfiguration()}>
      <AppWrapper>{children}</AppWrapper>
    </ConfigurationProvider>
  )
}