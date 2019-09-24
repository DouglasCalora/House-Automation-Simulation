import api from './api'

const remote = async (apiName, { id, payload, onError, onSuccess } = {}) => {
  if (!apiName || typeof apiName !== 'string' || !api[apiName]) {
    return null
  }

  let response = {}

  try {
    response = await api[apiName](id || payload, id ? payload : null)

    if (isFunction(onSuccess)) {
      onSuccess(response)
    }
  } catch (errors) {
    if (isFunction(onError)) {
      onError(errors)
    }
  }

  return response
}

const isFunction = fnc => typeof fnc === 'function'

const consoleObserverToObject = (observer, text) => console.log(JSON.parse(JSON.stringify(observer)), `<-- ${text}`)

export {
  remote,
  consoleObserverToObject
}
