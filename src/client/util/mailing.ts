import apiClient from './apiClient'

const sendEmail = async (targets: string[], text: string, subject: string) => {
  apiClient.post('/summary', {
    targets,
    text,
    subject,
  })
}

export default sendEmail
