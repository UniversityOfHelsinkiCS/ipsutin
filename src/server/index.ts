/* eslint-disable import/no-extraneous-dependencies */
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import path from 'path'

import { connectToDatabase } from './db/connection'
import seed from './db/seeders'
import { PORT, SESSION_SECRET } from './util/config'
import logger from './util/logger'
import setupAuthentication from './util/oicd'
import { redisStore } from './util/redis'
import router from './routes'

const app = express()

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  const DIST_PATH = path.resolve(__dirname, '../../dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, async () => {
  await connectToDatabase()
  await seed()

  await setupAuthentication()

  logger.info(`Server running on port ${PORT}`)
})
