import { useEffect } from 'react'

import { FormValues } from '../types'

interface PersistForm {
  value: FormValues
  sessionStorageKey:
    | 'ipsutin_licenses_local_save'
    | 'ipsutin_idea_evaluation_local_save'
    | 'ipsutin_ip_assessment_local_save'
}

const usePersistForm = ({ value, sessionStorageKey }: PersistForm) =>
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value))
  }, [value, sessionStorageKey])

export default usePersistForm
