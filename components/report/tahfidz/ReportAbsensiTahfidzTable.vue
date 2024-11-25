<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
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
        <select class="form-select" @change="getSantri()" v-model="selectedKelas" :disabled="!start || !end">
          <option value="">-- kelas --</option>
          <option v-for="(data, index) in kelas" :key="index" :value="data">{{ data.Nama }}</option>
        </select>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" rowspan="2" class="text-start">Halaqah</th>
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
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle">{{ data.Halaqah }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.absen }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat + data.izin + data.sakit + data.absen
              }}</td>
            <td class="text-end align-middle">
              <nuxt-link :to="`/report/tahfidz/absensi/${data.SK.replace('#', '%23')}`">
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
    ...mapState('report/tahfidz/absensi', ['santri', 'kelas']),
    ...mapGetters('report/tahfidz/absensi', ['getKelas', 'getStart', 'getEnd']),
    selectedKelas: {
      get() {
        return this.getKelas
      },
      set(value) {
        const obj = { key: 'selectedKelas', value }
        this.$store.commit('report/tahfidz/absensi/setState', obj)
      }
    },
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        this.setState({ key: 'start', value })
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        this.setState({ key: 'end', value })
      }
    }
  },
  methods: {
    ...mapActions('report/tahfidz/absensi', ['getSantri']),
    ...mapMutations('report/tahfidz/absensi', ['setState']),
    juz(value) {
      const juz = value / 20
      return juz
    },
    exportToExcel() {
      const halaqah = this.selectedKelas
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
      const wb = XLSX.utils.table_to_book(clonedTable, { sheet: 'Absensi Tahfidz Santri' });
      XLSX.writeFile(wb, `Report Absensi Tahfidz ${halaqah.Nama}.xlsx`);
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

/* button {
  padding: 2px 5px 0.5px !important;
}

button i {
  font-size: 14px !important;
  padding: -5px !important;
} */
</style>
