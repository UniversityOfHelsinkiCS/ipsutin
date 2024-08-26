import { useEffect, useState } from 'react'

function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}

export default useSessionStorage
