<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">From</span>
          <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="start">
          <span class="input-group-text" id="basic-addon1">To</span>
          <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="end">
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" colspan="4">Hafalan Baru</th>
          </tr>
          <tr>
            <th scope="col" class="text-start">Awal</th>
            <th scope="col" class="text-start">Akhir</th>
            <th scope="col" class="text-start">Baru</th>
            <th scope="col" class="text-start">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle" style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">{{ data.From }}</td>
            <td class="text-capitalize align-middle" style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">{{ data.To }}</td>
            <td class="text-capitalize align-middle">{{ data.Page }} Hal</td>
            <td class="text-capitalize align-middle">{{ data.Juz }} Juz</td>
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
    ...mapState('rekaphafalan', ['santri']),
    ...mapGetters('rekaphafalan', ['getStart', 'getEnd']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        const obj = { key: 'start', value}
        this.$store.commit('rekaphafalan/setState', obj)
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        const obj = { key: 'end', value}
        this.$store.commit('rekaphafalan/setState', obj)
      }
    }
  },
  watch: {
    start() {
      this.changeUnit()
    },
    end() {
      this.changeUnit()
    }
  },
  methods: {
    ...mapActions('rekaphafalan', ['changeUnit']),
    // ...mapMutations('mutabaah', ['showDetail'])
    juz(value) {
      const juz = value / 20
      return juz
    },
    exportToExcel() {
      const program = localStorage.getItem('program')
      const halaqah = this.$auth.user.Halaqah[program]
      const table = this.$refs.dataTable;
      const wb = XLSX.utils.table_to_book(table, { sheet: 'Hafalan Santri' });
      XLSX.writeFile(wb, `Rekap Ziyadah ${halaqah}.xlsx`);
    }
  },
};
</script>

<style scoped>
tr th, tr td {
  white-space: nowrap;
}
</style>
