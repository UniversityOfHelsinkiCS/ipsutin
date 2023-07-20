import { useCallback } from 'react'

const useResultRefCallback = () => {
  const refCallback = useCallback((resultDOMElement: HTMLDivElement) => {
    if (!resultDOMElement) return

    sessionStorage.setItem(
      'ipsutin-session-resultHTML',
      resultDOMElement.innerHTML
    )
  }, [])

  return refCallback
}

export default useResultRefCallback
