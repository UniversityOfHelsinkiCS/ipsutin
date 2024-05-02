const getInitialMessage = () => {
  if (process.env.NODE_ENV === 'development') {
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
