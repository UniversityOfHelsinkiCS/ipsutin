import { inDevelopment } from '../../config'

const getInitialMessage = () => {
  if (inDevelopment) {
    return {
      inventiveMessageDynamic: 'Cat-dog hybrid',
      publicMessageDynamic: 'No one knows',
      industrialMessageDynamic: 'Everyone would love it!',
    }
  }
  return {
    inventiveMessageDynamic: '',
    publicMessageDynamic: '',
    industrialMessageDynamic: '',
  }
}

export default getInitialMessage
