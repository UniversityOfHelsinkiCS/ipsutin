/* eslint-disable import/no-extraneous-dependencies */
import {
  Issuer,
  Strategy,
  TokenSet,
  UnknownObject,
  UserinfoResponse,
} from 'openid-client'
import passport from 'passport'

import { User } from '../db/models'
import NotFoundError from '../errors/NotFoundError'
import { User as UserType, UserInfo } from '../types'

import {
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_ISSUER,
  OIDC_REDIRECT_URI,
} from './config'

const params = {
  claims: {
    id_token: {
      uid: { essential: true },
      hyPersonSisuId: { essential: true },
    },
    userinfo: {
      email: { essential: true },
      hyGroupCn: { essential: true },
      preferredLanguage: null,
      given_name: null,
      family_name: null,
    },
  },
}

const checkAdmin = (iamGroups: string[]) =>
  iamGroups.some((iamGroup) => ['grp-toska', 'grp-his'].includes(iamGroup))

const getClient = async () => {
  const issuer = await Issuer.discover(OIDC_ISSUER)

  const client = new issuer.Client({
    client_id: OIDC_CLIENT_ID,
    client_secret: OIDC_CLIENT_SECRET,
    redirect_uris: [OIDC_REDIRECT_URI],
    response_types: ['code'],
  })

  return client
}

const verifyLogin = async (
  _tokenSet: TokenSet,
  userinfo: UserinfoResponse<UnknownObject, UnknownObject>,
  done: (err: any, user?: unknown) => void
) => {
  const {
    uid: username,
    hyPersonSisuId: id,
    email,
    hyGroupCn: iamGroups,
    preferredLanguage: language,
    given_name: firstName,
    family_name: lastName,
  } = userinfo as unknown as UserInfo

  const user: UserType = {
    username,
    id: id || username,
    email,
    iamGroups,
    language,
    firstName,
    lastName,
    isAdmin: checkAdmin(iamGroups) || username === 'glandmic',
  }

  await User.upsert({
    ...user,
    lastLoggedIn: new Date(),
  })

  done(null, user)
}

const setupAuthentication = async () => {
  const client = await getClient()

  passport.serializeUser((user, done) => {
    const { id, iamGroups, isAdmin } = user as UserType

    return done(null, { id, iamGroups, isAdmin })
  })

  passport.deserializeUser(
    async ({ id, iamGroups }: { id: string; iamGroups: string[] }, done) => {
      const user = await User.findByPk(id)

      if (!user)
        return done(new NotFoundError('User not found, authentication failed'))

      return done(null, { ...user.dataValues, iamGroups })
    }
  )

  passport.use('oidc', new Strategy({ client, params }, verifyLogin))
}

export default setupAuthentication
