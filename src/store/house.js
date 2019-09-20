import api from '../services/api'

const state = {
  rooms: [],
  devices: [],
  hasErrors: false
}

const getters = {
  rooms: state => state.rooms,
  devices: state => state.devices
}

const mutations = {
  GET_ROOMS (state, payload) {
    state.rooms = payload
  },

  GET_DEVICES (state, payload) {
    state.devices = payload
  }
}

const actions = {
  async getRooms ({ commit }, payload) {
    try {
      const response = await api['getRooms']()
      commit('GET_ROOMS', response.data)
    } catch (errors) {
      state.hasErrors = true
    }
  },

  async getDevices ({ commit }, payload) {
    try {
      const response = await api['getDevices']()
      commit('GET_DEVICES', response.data)
    } catch (errors) {
      state.hasErrors = true
    }
  },

  async deletePost ({ commit }, payload) {
    // await remote('deletePost', payload)

    // commit('GET_POSTS', await remote('getPosts'))
  },

  async createPost ({ commit }, payload) {

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
