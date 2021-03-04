import axios from 'axios';


const getRemoteConfiguration = async () => {
    const url = `https://api.hackertab.dev/data/remoteConfiguration.json`
    let { data } =  await axios.get(url)
    return data
}

export default {
    getRemoteConfiguration: getRemoteConfiguration,
}
