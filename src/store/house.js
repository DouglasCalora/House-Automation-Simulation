import { remote } from '../services/helpers'

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
  GET_ROOMS (state, payload) {
    state.rooms = payload
  },

  GET_DEVICES (state, { data }) {
    state.devices = data
  },

  SET_ERROR (state, { model }) {
    state.hasErrors[model] = true
  }
}

const actions = {
  getRooms ({ commit }, payload) {
    return remote('getRooms', {
      onSuccess ({ data }) {
        commit('GET_ROOMS', { data })
      },

      onError () {
        const model = 'fetchRooms'
        commit('SET_ERROR', { model })
      }
    })
  },

  getDevices ({ commit }) {
    return remote('getDevices', {
      onSuccess ({ data }) {
        commit('GET_DEVICES', { data })
      },

      onError () {
        const model = 'fetchDevices'
        commit('SET_ERROR', { model })
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
