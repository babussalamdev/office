<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white">{{ santri ? santri.length : 0 }}
            Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel"
            :disabled="santri.length > 0 ? false : true">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group me-2">
          <span class="input-group-text">Start</span>
          <input type="date" class="form-control" v-model="start">
          <span class="input-group-text">End</span>
          <input type="date" class="form-control" v-model="end">
        </div>
        <select class="form-select" v-model="selectedKelas" @change="getSantri()" :disabled="!start || !end">
          <option selected disabled value="">Kelas</option>
          <option v-for="(data, index) in listKelas" :key="index" :value="data">{{ data.Nama }}</option>
        </select>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" rowspan="2" class="text-start">Halaqah</th>
            <th scope="col" colspan="4">Murojaah</th>
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
            <td class="text-capitalize align-middle">{{ data.Halaqah }}</td>
            <td class="text-capitalize align-middle"
              style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">{{ data.From ===
                '-' ? data.From : `${data.From.ayat.number} : ${data.From.name}`
              }}
            </td>
            <td class="text-capitalize align-middle"
              style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">{{ data.To ===
                '-' ? data.To : `${data.To.ayat.number} : ${data.To.name}`
              }}</td>
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
    ...mapState('report/tahfidz/murojaah', ['santri', 'listKelas']),
    ...mapGetters('report/tahfidz/murojaah', ['getSelectedKelas', 'getStart', 'getEnd']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        const obj = {
          key: 'start', value
        }
        this.setState(obj)
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        const obj = {
          key: 'end', value
        }
        this.setState(obj)
      }
    },
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        const obj = {
          key: 'selectedKelas', value
        }
        this.setState(obj)
      }
    }
  },
  methods: {
    ...mapMutations('report/tahfidz/murojaah', ['setState']),
    ...mapActions('report/tahfidz/murojaah', ['changeUnit', 'getSantri']),

    juz(value) {
      const juz = value / 20
      return juz
    },
    exportToExcel() {
      const halaqah = this.selectedKelas
      const table = this.$refs.dataTable;
      const wb = XLSX.utils.table_to_book(table, { sheet: 'Hafalan Santri' });
      XLSX.writeFile(wb, `Report Hafalan Tahfidz ${halaqah.Nama}.xlsx`);
    }
  },
};
</script>

<style scoped>
tr th,
tr td {
  white-space: nowrap;
}

select {
  font-size: 12px;
  width: max-content;
}
</style>
