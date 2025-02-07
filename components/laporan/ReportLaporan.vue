<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <div class="row mb-3">
        <h2 class="mb-3">Report Laporan</h2>
        <div class="col-12 col-md-6 d-flex align-items-center">
          <select name="gedung" class="form-select" style="font-size: 12px;" v-model="selectedGedung" @change="getReport()">
            <option value="" selected disabled>gedung</option>
            <option v-for="(data, index) in listGedung" :key="index" :value="data.SK">{{ data.SK }}</option>
          </select>
          <select name="ruangan" class="form-select" style="font-size: 12px;" v-model="selectedRuang">
            <option value="" selected>All</option>
            <option v-for="(data, index) in listRuangan" :key="index" :value="data">{{ data }}</option>
          </select>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end">
          <input type="date" style="font-size: 12px;" class="form-control" v-model="start">
          <input type="date" style="font-size: 12px;" class="form-control" v-model="end">
          <button class="btn btn-sm btn-success" style="font-size: 12px;">Export</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">Mulai</th>
              <th scope="col" class="text-capitalize">Proses</th>
              <th scope="col" class="text-capitalize">Selesai/Terkendala</th>
              <th scope="col" class="text-capitalize">Job</th>
              <th scope="col" class="text-capitalize">Ruangan</th>
              <th scope="col" class="text-capitalize">PIU</th>
              <th scope="col" class="text-capitalize">Status</th>
              <th scope="col" class="text-capitalize">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.SK.split(' ')[0] }}
                </p>
                <p>
                  {{ data.SK.split(' ')[1] }}
                </p>
              </td>
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[0] : '-' }}
                </p>
                <p>
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[1] : '-' }}
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
              <td class="text-capitalize align-middle" scope="col">{{ data.Location }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.PIU }}</td>
              <td class="text-capitalize align-middle" scope="col">
                <span class="py-2 px-2 rounded-2" :class="data.Status === 'proses' ? 'bg-success text-white' : data.Status === 'selesai' ? 'bg-primary text-white' : data.Status === 'terkendala' ? 'bg-danger text-white' : 'bg-warning text-dark'">{{ data.Status }}</span>
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
    ...mapState('scan', ['listGedung', 'listLaporan']),
    ...mapGetters('scan', ['getSelectedGedung', 'getSelectedRuang', 'getStart', 'getEnd', 'filteredDatas']),
    selectedGedung: {
      get() {
        return this.getSelectedGedung
      },
      set(value) {
        this.$store.commit('scan/setState', { key: 'selectedGedung', value })
      }
    },
    selectedRuang: {
      get() {
        return this.getSelectedRuang
      },
      set(value) {
        this.$store.commit('scan/setState', { key: 'selectedRuang', value })
      }
    },
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        this.$store.commit('scan/setState', { key: 'start', value })
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        this.$store.commit('scan/setState', { key: 'end', value })
      }
    },
    listRuangan() {
      if (this.listLaporan) {
        const unique = [...new Set(this.listLaporan.map(item => item.Location))];
        return unique
      }
    }
  },
  methods: {
    ...mapActions('scan', ['getReport'])
  },
  watch: {
    start() {
      if (this.selectedGedung) {
        this.$store.dispatch('scan/getReport')
      }
    },
    end() {
      if (this.selectedGedung) {
        this.$store.dispatch('scan/getReport')
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
