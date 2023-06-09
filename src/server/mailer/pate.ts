import axios from 'axios'
import * as dotenv from 'dotenv'

import { PATE_URL } from '../util/config'
import { inProduction, inStaging } from '../../config'

dotenv.config()

const settings = {
  hideToska: false,
  disableToska: true,
  color: '#107eab',
  header: 'Ipsutin',
  headerFontColor: 'white',
  dryrun: !inProduction || inStaging,
}

const pateClient = axios.create({
  baseURL: PATE_URL,
  params: {
    token: process.env.API_TOKEN,
  },
})

const sendEmail = async (targets: string[], text: string, subject: string) => {
  const emails = targets.map((to) => ({ to, subject }))

  const mail = {
    template: {
      from: 'Ipsutin',
      text,
    },
    emails,
    settings,
  }

  await pateClient.post('/', mail)
}

export default sendEmail
