import api from './api'

const remote = async (apiName, id) => {
  if (typeof apiName !== 'string' || !apiName || !api[apiName]) {
    return null
  }

  let response = {}

  try {
    response = await api[apiName](id)
  } catch (error) {
    return false
  }

  if (apiStatus(response.status)) {
    return response.data
  }
}

const apiStatus = (status) => {
  if (typeof status !== 'number') {
    return null
  } else if (status >= 200 && status < 300) {
    return true
  } else if (status >= 400 && status < 500) {
    throw new Error('Client error')
  } else if (status >= 500) {
    throw new Error('Server error')
  }
}

export {
  remote
}
