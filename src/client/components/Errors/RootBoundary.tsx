import { useEffect } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import * as Sentry from '@sentry/browser'
import axios from 'axios'

import BaseError from './BaseError'

const RootBoundary = () => {
  const error = useRouteError() as unknown

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      Sentry.captureException(error.error)
    } else {
      Sentry.captureException(error)
    }
  }, [error])

  // Handle router errors
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <BaseError
          errorHeading='Not Found'
          errorDetails='Sorry, but the page cannot be found. The page may have been moved or deleted.'
        />
      )
    }
    if (error?.status === 401) {
      return (
        <BaseError
          errorHeading='Unauthorized'
          errorDetails='Sorry, but you do not have the needed access to this page.'
        />
      )
    }
    return (
      <BaseError
        errorHeading={error.error?.name || 'Unknown Error'}
        errorDetails={error.error?.message || error.statusText}
      />
    )
  }

  if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 404) {
      return (
        <BaseError
          errorHeading='Not Found'
          errorDetails='Sorry, but the page cannot be found. The page may have been moved or deleted.'
        />
      )
    }

    if (error.response.status === 401) {
      return (
        <BaseError
          errorHeading='Unauthorized'
          errorDetails='Sorry, but you do not have the needed access to this page.'
        />
      )
    }
  }
  return (
    <BaseError
      errorHeading='Error'
      errorDetails='Sorry, but something unexpected went wrong loading your page. We are looking into the issue.'
    />
  )
}

export default RootBoundary
