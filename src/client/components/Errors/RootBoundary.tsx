import { useEffect } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import * as Sentry from '@sentry/browser'
import axios from 'axios'

import BaseError from './BaseError'

const getErrorMessages = (error: unknown) => {
  let errorStatus = null

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status
  } else if (axios.isAxiosError(error) && error.response) {
    errorStatus = error.response.status
  }

  switch (errorStatus) {
    case 404:
      return {
        errorHeading: 'Not Found',
        errorDetails:
          'Sorry, but the page cannot be found. The page may have been moved or deleted.',
      }
    case 401:
      return {
        errorHeading: 'Unauthorized',
        errorDetails:
          'Sorry, but you do not have the needed access to this page.',
      }
    default:
      return {
        errorHeading: 'Error',
        errorDetails:
          'Sorry, but something unexpected went wrong loading your page. We are looking into the issue.',
      }
  }
}

const RootBoundary = () => {
  const error = useRouteError() as unknown

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      Sentry.captureException(error.error)
    } else {
      Sentry.captureException(error)
    }
  }, [error])

  const { errorHeading, errorDetails } = getErrorMessages(error)

  return <BaseError errorHeading={errorHeading} errorDetails={errorDetails} />
}

export default RootBoundary
