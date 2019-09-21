<template>
  <q-page class="flex flex-center">
    {{ rooms}}
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',

  methods: {
    ...mapActions(['getRooms', 'getDevices']),

    async fetch () {
      this.getRooms()
      this.getDevices()
      try {
      } catch (error) {

      }
    }

    // matchRooms () {
    //   let roomsList = this.rooms.map(room => {
    //     return this.devices.filter(device => device.roomsId === room.id )
    //   });
    //   console.log(roomsList, "<--room list")
    // }
  },

  created () {
    this.fetch()
  },

  computed: {
    ...mapGetters(['rooms', 'devices', 'hasErrors'])

    // getRoomsIds () {
    //   return this.rooms.map(item => item.id)
    // }

    // roomsList () {
    //   let newList = []
    //   this.rooms.map((room, indexMap) => {
    //     let device = this.devices.filter(device => device.roomsId === room.id)
    //     if (device.length > 0) {
    //       newList = [
    //         ...newList,
    //         {
    //           ...room,
    //           devices: device
    //         }
    //       ]
    //     }
    //   })
    //   return newList
    // }
  }
}
</script>
