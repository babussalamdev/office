<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <div class="row mb-3">
        <h2 class="mb-3">Report Kebersihan</h2>
        <div class="col-12 col-md-6 d-flex align-items-center mb-1 mb-md-0">
          <select class="form-select" style="font-size: 12px;" v-model="selectedMode">
            <option value="" selected disabled>Mode</option>
            <option value="gedung">Gedung</option>
            <option value="crew">Crew</option>
          </select>
          <select v-if="selectedMode === 'gedung'" class="form-select" style="font-size: 12px;" v-model="selectedGedung" @change="getReport()">
            <option value="" selected disabled>Select</option>
            <option v-for="(data, index) in listGedung" :key="index" :value="data.SK">{{ data.SK }}</option>
          </select>
          <select v-if="selectedMode === 'crew'" class="form-select" style="font-size: 12px;" v-model="selectedCrew" @change="getReport()">
            <option value="" selected disabled>Select</option>
            <option v-for="(data, index) in listCrew" :key="index" :value="data">{{ data.Nama }}</option>
          </select>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end">
          <input type="date" style="font-size: 12px; max-width: fit-content;" class="form-control" v-model="start">
          <input type="date" style="font-size: 12px;" class="form-control" v-model="end">
          <button class="btn btn-sm btn-success" style="font-size: 12px;">Export</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">Mulai</th>
              <th scope="col" class="text-capitalize">Selesai/Terkendala</th>
              <th scope="col" class="text-capitalize">Ruangan</th>
              <th scope="col" class="text-capitalize">PIC</th>
              <th scope="col" class="text-capitalize">Job</th>
              <th scope="col" class="text-capitalize">Status</th>
              <th scope="col" class="text-capitalize">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in listLaporan" :key="index">
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.SK.split('#')[1].split(' ')[0] }}
                </p>
                <p>
                  {{ data.SK.split('#')[1].split(' ')[1] }}
                </p>
              </td>
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[0] : (data.Timestamp?.terkendala ? data.Timestamp?.terkendala?.split(' ')[0] : '-') }}
                </p>
                <p>
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[1] : (data.Timestamp?.terkendala ? data.Timestamp?.terkendala?.split(' ')[1] : '-') }}
                </p>
              </td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Name }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.PIC }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Job }}</td>
              <td class="text-capitalize align-middle" scope="col">
                <span class="py-2 px-2 rounded-2" :class="data.Status === 'sedang dibersihkan' ? 'bg-primary text-white' : data.Status === 'selesai dibersihkan' ? 'bg-success text-white'  : data.Status === 'terkendala' ? 'bg-danger text-white' : 'bg-warning text-dark'">{{ data.Status }}</span>
              </td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Note }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('maintenance', ['listGedung', 'listLaporan', 'listCrew']),
    ...mapGetters('maintenance', ['getSelectedGedung', 'getSelectedCrew', 'getSelectedMode', 'getStart', 'getEnd']),
    selectedGedung: {
      get() {
        return this.getSelectedGedung
      },
      set(value) {
        this.$store.commit('maintenance/setState', { key: 'selectedGedung', value })
      }
    },
    selectedCrew: {
      get() {
        return this.getSelectedCrew
      },
      set(value) {
        this.$store.commit('maintenance/setState', { key: 'selectedCrew', value })
      }
    },
    selectedMode: {
      get() {
        return this.getSelectedMode
      },
      set(value) {
        this.$store.commit('maintenance/setState', { key: 'selectedMode', value })
      }
    },
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        this.$store.commit('maintenance/setState', { key: 'start', value })
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        this.$store.commit('maintenance/setState', { key: 'end', value })
      }
    },
  },
  methods: {
    ...mapActions('maintenance', ['getReport'])
  },
  watch: {
    start() {
      if (this.selectedMode) {
        this.$store.dispatch('maintenance/getReport')
      }
    },
    end() {
      if (this.selectedMode) {
        this.$store.dispatch('maintenance/getReport')
      }
    }
  },
}
</script>

<style scoped>
select, input {
  width: max-content;
}
</style>
