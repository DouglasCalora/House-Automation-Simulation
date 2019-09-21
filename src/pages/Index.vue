<template>
  <q-page class="flex flex-center">
   <q-list bordered :v-for="room in roomsList" class="rounded-borders">
    <q-expansion-item
        expand-separator
        icon="perm_identity"
        label=""
        caption="John Doe"
      >
        <q-card>
          <q-card-section>
            {{room}}
          </q-card-section>
        </q-card>
      </q-expansion-item>
   </q-list>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { consoleObserverToObject } from '../services/helpers'

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

  },

  created () {
    this.fetch()
  },

  computed: {
    ...mapGetters(['rooms', 'devices', 'hasErrors']),

    // getRoomsIds () {
    //   return this.rooms.map(item => item.id)
    // }

    roomsList () {
      let newList = []
      this.rooms.map((room, indexMap) => {
        let device = this.devices.filter(device => device.roomsId === room.id)
        if (device.length > 0) {
          newList = [
            ...newList,
            {
              ...room,
              devices: device
            }
          ]
        }
      })
      consoleObserverToObject(newList)
      return newList
    }
  }
}
</script>
