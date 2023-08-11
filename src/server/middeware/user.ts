import { NextFunction, Response } from 'express'

import { inDevelopment } from '../../config'
import mockHeaders from '../mocs/headers'

const parseIamGroups = (iamGroups: string) =>
  iamGroups?.split(';').filter(Boolean) ?? []

const checkAdmin = (iamGroups: string[]) =>
  iamGroups.some((iamGroup) =>
    ['hy-ypa-opa-ote', 'grp-toska'].includes(iamGroup)
  )

const userMiddleware = (req: any, _res: Response, next: NextFunction) => {
  const headers = inDevelopment ? mockHeaders : req.headers

  const {
    uid: username,
    givenname: firstName,
    sn: lastName,
    mail: email,
    preferredlanguage: language,
    hypersonsisuid: id,
    hygroupcn,
  } = headers

  const iamGroups = parseIamGroups(hygroupcn)

  const user = {
    id: id || username, // Username if no account in Sisu
    username,
    firstName,
    lastName,
    email,
    language,
    iamGroups,
    isAdmin: checkAdmin(iamGroups),
  }

  req.user = user

  return next()
}

export default userMiddleware
