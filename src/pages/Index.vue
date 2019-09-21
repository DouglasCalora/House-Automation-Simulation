<template>
  <q-page class="flex flex-center">
   <q-list bordered v-for="room in roomsList" :key="room" class="rounded-borders">
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

  data () {
    return {
      response: []
    }
  },

  methods: {
    ...mapActions(['getRooms', 'getDevices']),

    async fetch () {
      await this.getDevices()
      await this.getRooms()
      try {
      } catch (error) {

      }
    }

  },

  async created () {
    try {
      await this.fetch()
      console.log(this.rooms)
    } catch (erro) {
    }
  },

  computed: {
    ...mapGetters(['rooms', 'devices', 'hasErrors']),

    // getRoomsIds () {
    //   return this.rooms.map(item => item.id)
    // }

    roomsList () {
      let newList = []
      this.rooms.map((room, indexMap) => {
        let device = (this.devices || []).filter(device => device.roomsId === room.id)
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
