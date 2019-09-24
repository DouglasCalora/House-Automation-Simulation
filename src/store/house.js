import { remote } from '../services/helpers'
import Vue from 'vue'

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

  ADD_ROOM (state, { data }) {
    state.rooms.push(data)
  },

  GET_DEVICES (state, { data }) {
    state.devices = data
  },

  ADD_DEVICE (state, { data }) {
    state.devices.push(data)
  },

  SET_ERROR (state, { model }) {
    state.hasErrors[model] = true
  },

  PUT_DEVICES (state, { data }) {
    const index = state.devices.findIndex(device => device.id === data.id)
    Vue.set(state.devices, index, data)
  },

  DELETE_DEVICE (state, { data }) {
    const index = state.devices.findIndex(device => device.id === data)
    Vue.delete(state.devices, index)
  },

  DELETE_ROOM (state, { data }) {
    const index = state.rooms.findIndex(room => room.id === data)
    Vue.delete(state.rooms, index)
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

  addRoom ({ commit }, payload) {
    return remote('addRoom', {
      payload,

      onSuccess ({ data }) {
        commit('ADD_ROOM', { data })
      }
    })
  },

  addDevice ({ commit }, payload) {
    return remote('addDevice', {
      payload,

      onSuccess ({ data }) {
        commit('ADD_DEVICE', { data })
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

  deleteDevice ({ commit }, payload) {
    return remote('deleteDevice', {
      payload,

      onSuccess ({ data }) {
        commit('DELETE_DEVICE', { data: payload })
      }
    })
  },

  deleteRoom ({ commit }, payload) {
    return remote('deleteRoom', {
      payload,

      onSuccess ({ data }) {
        commit('DELETE_ROOM', { data: payload })
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
