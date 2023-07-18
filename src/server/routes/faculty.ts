import express from 'express'

import { inE2EMode } from '../../config'
import { RequestWithUser } from '../types'
import { getOrganisationData, getUserOrganisations } from '../util/jami'

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

facultyRouter.get('/user', async (req: RequestWithUser, res: any) => {
  const { id, iamGroups = [] } = req.user

  if (!id) return res.send([])

  if (inE2EMode) return res.send(mockFaculty)

  const organisationData = await getUserOrganisations(id, iamGroups)

  const faculties = organisationData.map(({ code, name }) => ({ code, name }))

  return res.send(faculties)
})

export default facultyRouter
