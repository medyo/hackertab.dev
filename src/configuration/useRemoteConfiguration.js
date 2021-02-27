import { useState, useEffect } from 'react';
import remoteConfigurationApi from '../services/remoteConfiguration'


export default function useRemoteConfiguration () {
    const [loadingConfiguration, setLoading] = useState(true)
    const [errorConfiguration, setError] = useState(null)
    const [configuration, setConfiguration] = useState(null)


    const fetch = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await remoteConfigurationApi.getRemoteConfiguration()
            throw ("ERRROR")
            setConfiguration(data)
        }
        catch (e) {
            setError(e)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return [configuration, loadingConfiguration, errorConfiguration]
}
