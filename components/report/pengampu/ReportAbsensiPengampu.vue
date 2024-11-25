<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ pegawai.length }} Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel"
          :disabled="pegawai.length > 0 ? false : true">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">From</span>
          <input type="date" class="form-control" v-model="start">
          <span class="input-group-text" id="basic-addon1">To</span>
          <input type="date" class="form-control" v-model="end">
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start align-middle">Nama</th>
            <th scope="col" colspan="5" class="text-center">Ketidakhadiran</th>
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
          <tr v-for="(data, index) in pegawai" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Terlambat }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Absen }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Terlambat + data.Sakit + data.Izin + data.Absen }}</td>
            <td class="text-end align-middle">
              <nuxt-link :to="`/report/pengampu/${data.SK}`">
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
  watch: {
    start() {
      this.changeUnit()
    },
    end() {
      this.changeUnit()
    }
  },
  computed: {
    ...mapState('report/pengampu', ['pegawai']),
    ...mapGetters('report/pengampu', ['getStart', 'getEnd']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        const obj = { key: 'start', value}
        this.$store.commit('report/pengampu/setState', obj)
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        const obj = { key: 'end', value}
        this.$store.commit('report/pengampu/setState', obj)
      }
    }
  },
  methods: {
    ...mapActions('report/pengampu', ['changeUnit']),
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    },
    juz(value) {
      const juz = value / 20
      return juz
    },
    exportToExcel() {
      const table = this.$refs.dataTable;

      const clonedTable = table.cloneNode(true);  // Clone tabel tanpa mempengaruhi tampilan asli

      // Menghapus kolom 'Action' dari salinan tabel
      const rows = clonedTable.querySelectorAll('tr');
      rows.forEach(row => {
        const actionColumn = row.querySelector('td:last-child, th:last-child');  // Menargetkan kolom terakhir
        if (actionColumn) {
          actionColumn.remove();  // Menghapus kolom Action dari salinan
        }
      });

      // Mengonversi salinan tabel (tanpa kolom Action) menjadi workbook Excel
      const wb = XLSX.utils.table_to_book(clonedTable, { sheet: 'Absensi Pengampu Tahfidz' });
      XLSX.writeFile(wb, `Report Absensi Pengampu Tahfidz.xlsx`);
    }
  },
};
</script>

<style scoped>
tr th, tr td {
  white-space: nowrap;
}
</style>
