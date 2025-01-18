<template>
  <div>
    <div class="row mb-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h3 style="font-size: 14px;">Settings Ruangan</h3>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end align-items-center gap-1">
          <div class="d-flex align-items-center">
            <select v-model="selectedGedung" class="form-select" style="font-size: 12px;">
              <option value="" disabled>gedung</option>
              <option v-for="(data, index) in listGedung" :key="index" :value="data.SK">{{ data.SK }}</option>
            </select>
          </div>
          <span>
            <button v-if="btn" style="font-size: 12px;" @click="downloadQr()"
              class="btn btn-sm btn-success" :disabled="selectedRooms.length > 0 ? false : true">QRCode</button>
            <button v-else class="btn btn-success btn-sm" style="font-size: 12px;" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Loading...</span>
            </button>
          </span>
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button style="font-size: 12px;" type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#ruanganModal" :disabled="selectedGedung ? false : true">
              Tambah Data
            </button>
          </div>
        </div>
      </div>
    <RuanganModal />
    <RuanganModalUpdate />
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th class="text-start"><label>
                <input type="checkbox" @change="selectAll($event)" />
              </label></th>
            <th scope="col">Ruangan</th>
            <th scope="col">Gedung</th>
            <th scope="col">Job</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in ruangan" :key="i">
            <td><label>
                <input type="checkbox" v-model="selectedRooms" :value="{ name: data.Name, code: data.SK }" />
              </label></td>
            <td scope="row" class="text-capitalize align-middle">{{ data.Name }}</td>
            <td scope="row" class="text-capitalize align-middle">
              {{ data.PK }}
            </td>
            <td scope="row" class="text-capitalize align-middle">
              <div v-if="data.Job && data.Job.trim() !== ''">
                <div v-for="(value, index) in data.Job.split(',')" :key="index" style="display: inline">
                  <div class="btn-group btn-group-sm px-1">
                    <div class="btn btn-dark">
                      <span style="font-size: 12px;">{{ value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td scope="row" class="text-capitalize align-middle">
              {{ data.Status }}
            </td>
            <td class="text-end align-middle">
              <a href="javascript:;">
                <button class="btn btn-sm" :class="data.Status === 'active' ? 'btn-primary' : 'btn-secondary'" @click="ubahData(data.SK, data.Status)">
                  <i class='bx bx-power-off'></i>
                </button>
              </a>
              <a href="javascript:;">
                <button class="btn btn-sm btn-warning" @click="updateData(data.SK)">
                  <i class='bx bx-pencil'></i>
                </button>
              </a>
              <a>
                <button class="btn btn-sm btn-danger" @click="deleteItem(data.SK)">
                  <i class="bx bx-trash text-white"></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('ruangan', ['listGedung', 'ruangan', 'btn']),
    ...mapGetters('ruangan', ['getSelectedGedung', 'getSelectedRooms']),
    selectedGedung: {
      get() {
        return this.getSelectedGedung
      },
      set(value) {
        this.$store.commit('ruangan/setState', { key: 'selectedGedung', value })
      }
    },
    selectedRooms: {
      get() {
        return this.getSelectedRooms
      },
      set(value) {
        this.$store.commit('ruangan/setState', { key: 'selectedRooms', value })
      }
    }
  },
  methods: {
    ...mapActions('ruangan', ['deleteItem', 'updateItem', 'downloadQr']),
    ...mapMutations('ruangan', ['updateData']),
    ubahData(sk, status) {
      this.updateItem({ sk, status })
    },
    selectAll(event) {
      const value = event.target.checked ? this.ruangan.map(x => ({ code: x.SK, name: x.Name })) : []
      this.$store.commit('ruangan/setState', { key: 'selectedRooms', value })
    },
  },
  watch: {
    selectedGedung(value) {
      if (value) {
        this.$store.dispatch('ruangan/getRuangan')
      }
    }
  },
}
</script>

<style scoped>

</style>
