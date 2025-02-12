<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center mb-1 mb-md-0">
          <h2 class="">Performance Laporan</h2>
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
              <!-- <th scope="col" class="text-capitalize">Proses</th> -->
              <th scope="col" class="text-capitalize">Selesai/Terkendala</th>
              <th scope="col" class="text-capitalize">Job</th>
              <th scope="col" class="text-capitalize">Ruangan</th>
              <th scope="col" class="text-capitalize">PIU</th>
              <th scope="col" class="text-capitalize">Status</th>
              <th scope="col" class="text-capitalize">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in performance" :key="index">
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.SK.split(' ')[0] }}
                </p>
                <p>
                  {{ data.SK.split(' ')[1] }}
                </p>
              </td>
              <!-- <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[0] : '-' }}
                </p>
                <p>
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[1] : '-' }}
                </p>
              </td> -->
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[0] : (data.Timestamp?.terkendala ?
                    data.Timestamp?.terkendala?.split(' ')[0] : '-') }}
                </p>
                <p>
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[1] : (data.Timestamp?.terkendala ?
                    data.Timestamp?.terkendala?.split(' ')[1] : '-') }}
                </p>
              </td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Name }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Location }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.PIC }}</td>
              <td class="text-capitalize align-middle" scope="col">
                <span class="py-2 px-2 rounded-2"
                  :class="data.Status === 'proses' ? 'bg-success text-white' : data.Status === 'selesai' ? 'bg-primary text-white' : data.Status === 'terkendala' ? 'bg-danger text-white' : 'bg-warning text-dark'">{{
                    data.Status }}</span>
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
    ...mapState('scan', ['listGedung', 'listLaporan', 'performance']),
    ...mapGetters('scan', ['getStart', 'getEnd']),
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
  },
  methods: {
  },
  watch: {
    start() {
      this.$store.dispatch('scan/getReportPerformance')
    },
    end() {
      this.$store.dispatch('scan/getReportPerformance')
    }
  },
}
</script>

<style scoped>
select,
input {
  width: max-content;
}
</style>
