import apiClient from './apiClient'

const sendResultsToEmail = async (
  targets: string[],
  text: string,
  subject: string
) => {
  apiClient.post('/summary', {
    targets,
    text,
    subject,
  })
}

export default sendResultsToEmail
