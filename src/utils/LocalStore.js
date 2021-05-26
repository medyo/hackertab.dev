import localftorage from 'localforage';


const LocalStore = {
    
    cacheResponse: async (url, response) => {
        console.log(response)
        const { headers:{etag}, data } = response

        localftorage.setItem(url+"_etag", JSON.stringify({data, etag}))
    },

    getCachedResponse: async (url) => {
        const response = await localftorage.getItem(url+"_etag")
        if (response) {
            return JSON.parse(response)
        }
        return null
    }
}

export default LocalStore