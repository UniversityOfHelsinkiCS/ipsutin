/* eslint-disable react/button-has-type */
import React from 'react'

import { useUpdatePreferredFaculty } from '../hooks/useUser'

const TestComponent = () => {
  const mutation = useUpdatePreferredFaculty()

  const handleUpdateFaculty = async () => {
    try {
      await mutation.mutate('H48')
      console.log('Preferred faculty updated successfully')
    } catch (error) {
      console.error('Error updating preferred faculty')
    }
  }

  return (
    <div>
      <button onClick={handleUpdateFaculty}>Update Preferred Faculty</button>
    </div>
  )
}

export default TestComponent
