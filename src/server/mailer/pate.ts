import axios from 'axios'
import * as dotenv from 'dotenv'

import { PATE_URL } from '../util/config'

dotenv.config()

const settings = {
  hideToska: false,
  disableToska: true,
  color: 'black',
  header: `Inventor's Assistant`,
  headerFontColor: 'white',
  dryrun: false,
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
      from: `Inventor's Assistant`,
      text,
    },
    emails,
    settings,
  }

  await pateClient.post('/', mail)
}

export default sendEmail
