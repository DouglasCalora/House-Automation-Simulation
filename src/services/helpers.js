import api from './api'

const remote = async (apiName, { id, payload, onError, onSuccess } = {}) => {
  if (!apiName || typeof apiName !== 'string' || !api[apiName]) {
    return null
  }

  let response = {}

  try {
    response = await api[apiName](id || payload, id ? payload : null)

    if (isFunction(onSuccess)) {
      return onSuccess(response)
    }
  } catch (errors) {
    if (isFunction(onSuccess)) {
      return onError(errors)
    }
  }
}

const isFunction = fnc => typeof fnc === 'function'

export {
  remote
}
