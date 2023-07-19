import { useEffect } from 'react'

import { FormValues, SurveySave } from '../types'

interface PersistForm {
  value: FormValues
  sessionStorageKey: SurveySave
}

const usePersistForm = ({ value, sessionStorageKey }: PersistForm) =>
  useEffect(() => {
    if (Object.keys(value).length === 0) return

    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value))
  }, [value, sessionStorageKey])

export default usePersistForm
