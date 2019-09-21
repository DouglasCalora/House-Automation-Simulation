<template>
  <q-page class="column items-center" padding>
  <div class="column items-center">
    <q-list
      bordered
      v-for="(room, indexRoom) in roomsList"
      :key="indexRoom"
      class="rounded-borders q-mt-md"
      style="width: 600px;"
    >
      <q-expansion-item
          expand-separator
          icon="meeting_room"
          :label="room.name"
        >
          <q-card>
            <q-card-section>
            <div
              v-for="(device, indexDevice) in room.devices"
              :key="indexDevice"
              class="row justify-between"
            >
              <div>
                <q-toggle
                  v-model="device.status"
                  checked-icon="check"
                  color="blue"
                  :label="device.name"
                  unchecked-icon="clear"
                  style="margin-right: 10px;"
                />
                <q-badge transparent align="middle" :color="device.status | valueStatus('colorStatus')">
                  {{device.status | valueStatus(statusValueString)}}
                </q-badge>
              </div>
              <div>
                <q-btn
                  flat
                  round
                  color="red"
                  icon="delete_outline"
                  @click="onClickDeleteDevice(device)"
                />
              </div>
            </div>
            <div class="row justify-center">
              <q-btn
                outline
                rounded
                color="primary"
                label="Adicionar dispositivo"
                size="10px"
                style="margin-left: 13px; margin-top: 10px;"
                icon="add"
              />
            </div>
            </q-card-section>
          </q-card>
      </q-expansion-item>
      <q-item>
        <q-item-section>
          <div class="row justify-center">
            <q-btn
              outline
              rounded
              color="red"
              label="Deletar cômodo"
              size="10px"
              icon="delete"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn
      outline
      rounded
      color="primary"
      label="Adicionar cômodo"
      size="10px"
      style="margin-top: 16px;"
      icon="add"
    />
   </div>
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
    },

    onClickDeleteDevice (device) {
      console.log(device, '<-- device')
    }

  },

  filters: {
    valueStatus: function (status, returnType) {
      if (returnType === 'colorStatus') {
        return status ? 'green' : 'red'
      } else {
        return status ? 'Ligado' : 'Desligado'
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

    roomsList: function () {
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
