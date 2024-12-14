<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ dataRekap.length }} Pegawai</span>
          <button class="btn btn-success border-0"
          :disabled="dataRekap.length > 0 ? false : true">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">From</span>
          <input type="date" class="form-control" v-model="startRekap" :max="endRekap">
          <span class="input-group-text" id="basic-addon1">To</span>
          <input type="date" class="form-control" v-model="endRekap" :min="startRekap">
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" colspan="5">Ketidakhadiran</th>
            <th scope="col" rowspan="2" class="text-end">Action</th>
          </tr>
          <tr>
            <th scope="col" class="text-center bg-primary">T</th>
            <th scope="col" class="text-center bg-warning">S</th>
            <th scope="col" class="text-center bg-secondary">I</th>
            <th scope="col" class="text-center bg-danger">A</th>
            <th scope="col" class="text-center">Jumlah</th>
            <th scope="col" rowspan="2" class="text-end" hidden>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataRekap" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Terlambat }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Absen }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Terlambat + data.Izin + data.Sakit + data.Absen
              }}</td>
            <td class="text-end align-middle">
              <nuxt-link :to="`/laundry/absensi/${data.SK}`">
                <button class="btn btn-primary">
                  <i class="material-symbols-outlined">
                    info
                  </i>
                </button>
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import * as XLSX from 'xlsx'

export default {
  computed: {
    ...mapState('laundry/absensi', ['dataRekap']),
    ...mapGetters('laundry/absensi', ['getStartRekap', 'getEndRekap']),
    startRekap: {
      get() {
        return this.getStartRekap
      },
      set(value) {
        const obj = { key: 'startRekap', value }
        this.$store.commit('laundry/absensi/setState', obj)
      }
    },
    endRekap: {
      get() {
        return this.getEndRekap
      },
      set(value) {
        const obj = { key: 'endRekap', value }
        this.$store.commit('laundry/absensi/setState', obj)
      }
    }
  },
  watch: {
    startRekap() {
      this.$store.dispatch('laundry/absensi/getRekapAbsensi')
    },
    endRekap() {
      this.$store.dispatch('laundry/absensi/getRekapAbsensi')
    }
  },
  methods: {
  },
};
</script>

<style scoped>
tr th,
tr td {
  white-space: nowrap;
}

/* button {
  padding: 2px 5px 0.5px !important;
}

button i {
  font-size: 14px !important;
  padding: -5px !important;
} */
</style>
