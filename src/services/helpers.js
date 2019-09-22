import api from './api'

const remote = async (apiName, { id, payload, onError, onSuccess } = {}) => {
  if (typeof apiName !== 'string' || !apiName || !api[apiName]) {
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

const consoleObserverToObject = (observer, text) => console.log(JSON.parse(JSON.stringify(observer)), `<-- ${text}`)

export {
  remote,
  consoleObserverToObject
}
