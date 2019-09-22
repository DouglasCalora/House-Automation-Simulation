import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export default {
  async getRooms () {
    return axios.get('rooms')
  },

  async getDevices () {
    return axios.get(`devices`)
  },

  async changeStatusDevice (data) {
    return axios.put(`devices/${data.id}`, data)
  }
}
