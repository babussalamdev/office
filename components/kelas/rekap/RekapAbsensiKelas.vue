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
        <div class="input-group">
        </div>
        <div class="input-group">
          <select class="form-select" v-model="selectedKelas" @change="applyFilter">
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">{{ data }}</option>
          </select>
          <select class="form-select" v-model="selectedMapel" @change="getDataSantri">
            <option value="" selected disabled>Mapel</option>
            <option v-for="(data, index) in uniqueLesson" :key="index" :value="data">{{ data.Nama }}</option>
          </select>
          <span class="input-group-text" id="basic-addon1">From</span>
          <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="start" :max="end" :disabled="!selectedKelas || !selectedMapel">
          <span class="input-group-text" id="basic-addon1">To</span>
          <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="end" :min="start" :disabled="!selectedKelas || !selectedMapel">
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" colspan="5">Ketidakhadiran</th>
          </tr>
          <tr>
            <th scope="col" class="text-center bg-primary">T</th>
            <th scope="col" class="text-center bg-warning">S</th>
            <th scope="col" class="text-center bg-secondary">I</th>
            <th scope="col" class="text-center bg-danger">A</th>
            <th scope="col" class="text-center">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.absen }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat + data.izin + data.sakit + data.absen
              }}</td>
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
    ...mapState('kelasAbsensi/rekap', ['select']),
    ...mapGetters('kelasAbsensi/rekap', ['getStart', 'getEnd', 'getSelectedKelas', 'getSelectedMapel', 'getSantri']),
    santri: {
      get() {
        return this.getSantri
      },
      set(value) {
        this.$store.commit('kelasAbsensi/rekap/setState', { key: 'santri', value })
      }
    },
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        const obj = { key: 'start', value }
        this.$store.commit('kelasAbsensi/rekap/setState', obj)
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        const obj = { key: 'end', value }
        this.$store.commit('kelasAbsensi/rekap/setState', obj)
      }
    },
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('kelasAbsensi/rekap/setState', { key: 'selectedKelas', value})
      }
    },
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        this.$store.commit('kelasAbsensi/rekap/setState', { key: 'selectedMapel', value})
      }
    },
    uniqueClasses() {
      const classes = this.select.map(item => item.Kelas);
      return [...new Set(classes)];
    },
    filteredData() {
      return this.select.filter(item => {
        const matchesClass = item.Kelas === this.selectedKelas;
        this.selectedMapel = '',
          this.selectedJam = ''
        this.santri = []
        return matchesClass
      });
    },
    uniqueLesson() {
      return this.filteredData.map(item => {
        return {
          Nama: item.Nama,
          SK: item.SK,
          Hari: item.Hari
        }
      })
    },
  },
  watch: {
    start() {
      this.getDataSantriByDate()
    },
    end() {
      this.getDataSantriByDate()
    }
  },
  methods: {
    ...mapActions('kelasAbsensi/rekap', ['changeUnit', 'getDataSantri', 'getDataSantriByDate']),
    applyFilter() {
      this.uniqueLesson;
    },
    exportToExcel() {
      const table = this.$refs.dataTable;
      const program = localStorage.getItem('program')
      const halaqah = this.$auth.user.Halaqah[program]
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
      const wb = XLSX.utils.table_to_book(clonedTable, { sheet: 'Rekap Absensi Tahfidz' });
      XLSX.writeFile(wb, `Rekap Absensi ${halaqah}.xlsx`);
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
}
</style>
