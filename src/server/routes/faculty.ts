import express from 'express'

import { inE2EMode } from '../../config'
import { getOrganisationData } from '../util/jami'

const mockFaculty = [
  {
    code: 'H50',
    name: {
      fi: 'Matemaattis-luonnontieteellinen tiedekunta',
      en: 'Faculty of Science',
      sv: 'Matematisk-naturvetenskapliga fakulteten',
    },
  },
]

const facultyRouter = express.Router()

facultyRouter.get('/', async (req, res) => {
  if (inE2EMode) return res.send(mockFaculty)

  const organisationData = (await getOrganisationData()) || []

  const faculties = organisationData.map(({ code, name }) => ({ code, name }))

  return res.send(faculties)
})

export default facultyRouter
