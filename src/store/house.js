import { remote, consoleObserverToObject } from '../services/helpers'

const state = {
  rooms: [],
  devices: [],
  hasErrors: {
    fetchRooms: false,
    deleteRooms: false,
    fetchDevices: false,
    deleteDevices: false,
    updateDevices: false
  }
}

const getters = {
  rooms: state => state.rooms,
  devices: state => state.devices,
  hasErrors: state => state.hasErrors
}

const mutations = {
  GET_ROOMS (state, { data }) {
    state.rooms = data
  },

  GET_DEVICES (state, { data }) {
    state.devices = data
  },

  SET_ERROR (state, { model }) {
    state.hasErrors[model] = true
  },

  PUT_DEVICES (state, { data }) {
    let indexDeviceChanged = state.devices.findIndex(device => device.id === data.id)
    state.devices[indexDeviceChanged] = data
    consoleObserverToObject(state.devices, '<-- devices')
  }
}

const actions = {
  getRooms ({ commit }) {
    return remote('getRooms', {
      onSuccess ({ data }) {
        commit('GET_ROOMS', { data })
      },

      onError () {
        commit('SET_ERROR', { model: 'fetchRooms' })
      }
    })
  },

  changeStatusDevice ({ commit }, payload) {
    return remote('changeStatusDevice', {
      payload,

      onSuccess ({ data }) {
        commit('PUT_DEVICES', { data })
      },

      onError () {
        commit('SET_ERROR', { model: 'fetchDevices' })
      }
    })
  },

  getDevices ({ commit }) {
    return remote('getDevices', {
      onSuccess ({ data }) {
        commit('GET_DEVICES', { data })
      },

      onError () {
        commit('SET_ERROR', { model: 'fetchDevices' })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
