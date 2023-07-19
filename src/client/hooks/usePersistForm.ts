import { useEffect } from 'react'

import { FormValues, SurveySave } from '../types'

interface PersistForm {
  value: FormValues
  sessionStorageKey: SurveySave
}

const usePersistForm = ({ value, sessionStorageKey }: PersistForm) =>
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value))
  }, [value, sessionStorageKey])

export default usePersistForm
