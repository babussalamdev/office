<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0" :disabled="santri.length > 0 ? false : true"
            @click="exportToExcel()">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <select v-if="kelas.length > 0" style="font-size: 12px; max-width: max-content;" class="form-select"
          @change="getSantri" v-model="selectedKelas">
          <option value="">Kelas</option>
          <option v-for="(data, index) in kelas" :value="data.Nama" :key="index">{{ data.Nama }}</option>
        </select>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">From</span>
          <input type="date" class="form-control" v-model="start" @change="getSantri">
          <span class="input-group-text" id="basic-addon1">To</span>
          <input type="date" class="form-control" v-model="end" @change="getSantri">
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start align-middle">Nama</th>
            <th scope="col" colspan="5" class="text-center">Ketidakhadiran</th>
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
            <td class="text-capitalize align-middle text-center">{{ data.terlambat + data.sakit + data.izin + data.absen
              }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@fullcalendar/core';
import * as XLSX from 'xlsx'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('report/absensi', ['santri', 'kelas']),
    ...mapGetters('report/absensi', ['getStart', 'getEnd', 'getKelas']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        const obj = { key: 'start', value }
        this.$store.commit('report/absensi/setState', obj)
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        const obj = { key: 'end', value }
        this.$store.commit('report/absensi/setState', obj)
      }
    },
    selectedKelas: {
      get() {
        return this.getKelas
      },
      set(value) {
        this.$store.commit('report/absensi/setState', { key: 'selectedKelas', value })
      }
    }
  },
  methods: {
    ...mapActions('report/absensi', ['changeUnit', 'getSantri']),
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    },
    exportToExcel() {
      const updatedData = this.santri.map(item => {
        const total = item.sakit + item.terlambat + item.absen + item.izin;
        return {
          ...item,
          total // Menambahkan total ke dalam objek
        };
      });

      // Memilih hanya kolom yang diinginkan dan menambahkan total
      const filteredData = updatedData.map(({ SK, Halaqah, ...rest }) => rest);

      // Membuat worksheet dari data
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Menyimpan file Excel
      XLSX.writeFile(workbook, `Report Absensi Kelas ${this.selectedKelas}.xlsx`);
    }
  },
};
</script>

<style scoped>
tr th,
tr td {
  white-space: nowrap;
}
</style>
