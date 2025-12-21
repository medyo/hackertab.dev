import { StateStorage } from 'zustand/middleware'

const localStateStore: StateStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name)
    return value ? value : null
  },
  setItem: (name: string, value: string) => {
    try {
      window.localStorage.setItem(name, value)
    } catch (e) {
      window.localStorage.setItem(name, '')
    }
  },
  removeItem: (name: string) => {
    window.localStorage.removeItem(name)
  },
}

export default localStateStore
