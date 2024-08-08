import { inE2EMode } from '../../config'
import mockFaculty from '../mocs/faculty'
import { Faculty } from '../types'
import { getOrganisationData, getUserOrganisations } from '../util/jami'

export const getFaculties = async (): Promise<Faculty[]> => {
  if (inE2EMode) return mockFaculty

  const organisationData = (await getOrganisationData()) || []

  const faculties = organisationData.map(({ code, name }) => ({ code, name }))

  return faculties
}

export const getUserFaculties = async (
  userId: string,
  iamGroups: string[] | null
): Promise<Faculty[]> => {
  if (inE2EMode) return mockFaculty

  if (!userId || !iamGroups) return []

  const organisationData = await getUserOrganisations(userId, iamGroups)

  const faculties = organisationData.map(({ code, name }) => ({ code, name }))

  return faculties
}
