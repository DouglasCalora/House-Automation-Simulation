import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export default {
  getRooms () {
    return axios.get('rooms')
  },

  addRoom (data) {
    return axios.post('rooms', data)
  },

  getDevices () {
    return axios.get(`devices`)
  },

  addDevice (data) {
    return axios.post('devices', data)
  },

  changeStatusDevice (data) {
    return axios.put(`devices/${data.id}`, data)
  },

  deleteDevice (id) {
    return axios.delete(`devices/${id}`)
  },

  deleteRoom (id) {
    return axios.delete(`rooms/${id}`)
  }
}
