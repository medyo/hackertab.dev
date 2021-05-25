import localftorage from 'localforage';


const LocalStore = {
    get: async (key) => {
        const itemStr = await localftorage.getItem(key)
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (item.expiry && now.getTime() > item.expiry) {
            localftorage.removeItem(key)
            return null
        }
        return item.value
    },

    set: async (key, value, ttl) => {
        const now = new Date()
        const item = {
            value: value,
            expiry: ttl ? now.getTime() + ttl : null,
        }
        localftorage.setItem(key, JSON.stringify(item))
    }
}

export default LocalStore