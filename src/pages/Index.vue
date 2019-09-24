<template>
  <q-page class="column items-center" padding>
    <div class="column items-center" style="max-width: 600px; width: 100%;">
      <q-list
        bordered
        v-for="(room, indexRoom) in roomsList"
        :key="indexRoom"
        class="rounded-borders q-mt-md"
        style="width: 100%"
      >
        <q-expansion-item
            expand-separator
            icon="meeting_room"
            :label="room.name"
            class=" q-gutter-y-md"
          >
            <q-card>
              <q-card-section>
              <div
                v-for="(item, indexDevice) in room.devices"
                :key="indexDevice"
                class="row justify-between"
              >
                <div>
                  <q-form @submit.native="onChangeStatusDevice(item)">
                    <q-btn type="submit" class="q-mr-md" color="primary" outline label="Salvar" size="10px" icon="power_settings_new">
                      <q-tooltip anchor="bottom middle" :content-class="item.status ? 'bg-red' : 'bg-green'" :offset="[10, 10]">
                        Clique aqui para {{ item.status | toggle }} {{ item.name }}
                      </q-tooltip>
                    </q-btn>
                    <q-badge
                      transparent
                      align="middle"
                      :color="item.status | valueStatus('colorStatus')"
                    >
                      <strong>{{item.name.toUpperCase()}}</strong> | {{item.status | valueStatus('statusValueString')}}
                    </q-badge>
                  </q-form>
                </div>
                <div>
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="delete_outline"
                    @click="deleteDevice(item.id)"
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
          <q-item-section top>
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
        @click="dialogRoom = true"
        size="10px"
        style="margin-top: 16px;"
        icon="add"
      />
      </div>

    <q-dialog v-model="dialogRoom">
      <q-card class="q-pa-md" style="min-width: 400px">
        <q-form @submit="submit()">
          <q-input v-model="fieldRoom.name" label="Nome do comodo"/>

          <q-card-actions align="right" class="text-primary">
            <q-btn type="submit" flat label="Criar" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',

  data () {
    return {
      dialogRoom: false,
      roomsId: 0,
      allowed: false,

      fieldRoom: {
        name: ''
      },

      fieldDevice: {
        name: 'tv',
        roomsId: null
      }
    }
  },

  methods: {
    ...mapActions([
      'getRooms',
      'getDevices',
      'changeStatusDevice',
      'deleteDevice',
      'addRoom',
      'addDevice'
    ]),

    async fetch () {
      await this.getDevices()
      await this.getRooms()

      try {
      } catch (error) {
        console.error(error)
      }
    },

    onChangeStatusDevice (device) {
      const payload = {
        ...device,
        status: !device.status
      }

      this.changeStatusDevice(payload)
    },

    submit () {
      this.addRoom(this.fieldRoom)

      if (this.allowed) {
        // this.addDevice({
        //   ...this.fieldDevice, roomsId: this.roomsId + 1
        // })

        this.allowed = false
      }
    }
  },

  watch: {
    rooms (value) {
      this.roomsId = value[value.length - 1].id
      this.allowed = true
    }
  },

  filters: {
    valueStatus: function (status, returnType) {
      if (returnType === 'colorStatus') {
        return status ? 'green' : 'red'
      } else {
        return status ? 'ligado' : 'desligado'
      }
    },

    toggle (value) {
      return value ? 'desligar' : 'ligar'
    }
  },

  created () {
    this.fetch()
  },

  computed: {
    ...mapGetters(['rooms', 'devices', 'hasErrors']),

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
        } else if (room.id !== device.roomsId) {
          newList.push(room)
        }
      })
      return newList
    }
  }
}
</script>
