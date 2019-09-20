import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export default {
  getRooms () {
    return axios.get('rooms')
  },

  getDevices () {
    return axios.get(`devices`)
  },

  deletePost (id) {
    return axios.delete(`posts/${id}`)
  }
}
