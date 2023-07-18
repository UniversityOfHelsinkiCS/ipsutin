import express from 'express'
import path from 'path'

import { connectToDatabase } from './db/connection'
import seed from './db/seeders'
import { PORT } from './util/config'
import logger from './util/logger'
import router from './routes'

const app = express()

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

  logger.info(`Server running on port ${PORT}`)
})
