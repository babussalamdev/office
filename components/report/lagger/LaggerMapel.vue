<template>
  <div class="animate__animated animate__fadeInUp">
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-3 mb-md-0 d-flex align-items-center">
        <h2 class="mb-0">Lagger Mapel</h2>
      </div>
      <div class="col-12 col-md-6 mb-3 mb-md-0 d-flex flex-column flex-md-row justify-content-end gap-2">
        <div class="input-group d-flex justify-content-end">
          <!-- <select v-if="kelas" style="max-width: max-content !important;" name="" id="" class="form-select" v-model="selectedKelas" @change="changeUnit">
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in kelas" :value="data.Nama" :key="index">{{ data.Nama }}</option>
          </select> -->
          <select style="max-width: max-content !important;" name="" id="" class="form-select" v-model="selectedMapel">
            <option value="" selected disabled>Mapel</option>
            <option v-for="(data, index) in mapelSelect[0]" :value="data" :key="index">{{ data }}</option>
          </select>
          <select style="max-width: max-content !important;" name="" id="" class="form-select" v-model="selectedQuran">
            <option value="" selected disabled>Quran</option>
            <option v-for="(data, index) in quranSelect[0]" :value="data" :key="index">{{ data }}</option>
          </select>
          <button class="btn btn-primary border-0" @click="getSantri"
            :disabled="selectedMapel && selectedQuran ? false : true">Submit</button>
        </div>
        <button class="btn btn-danger border-0" @click="changeUnit">Reset</button>
        <button class="btn btn-sm btn-success" @click="exportToExcel()">Export</button>
      </div>
    </div>
    <div class="table-responsive" ref="input">
      <table class="table table-hover table-striped" ref="dataTable">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th class="text-uppercase text-center" v-for="(value, key) in dynamicKeys" :key="key">{{ value }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
            </td>
            <td class="text-center" v-for="key in dynamicKeys" :key="key">{{ data[key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import * as XLSX from 'xlsx';
export default {
  computed: {
    ...mapState('report/lagger', ['select', 'mapelSelect', 'quranSelect', 'kelas']),
    ...mapGetters('report/lagger', ['getSelectedMapel', 'getSelectedQuran', 'getSelectedKelas', 'getDataSantri', 'getNilai',]),
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        this.$store.commit('report/lagger/setState', { key: 'selectedMapel', value })
      }
    },
    selectedQuran: {
      get() {
        return this.getSelectedQuran
      },
      set(value) {
        this.$store.commit('report/lagger/setState', { key: 'selectedQuran', value })
      }
    },
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('report/lagger/setState', { key: 'selectedKelas', value })
      }
    },
    nilai: {
      get() {
        return this.getNilai
      },
      set(value) {
        const obj = { key: 'nilai', value }
        this.$store.commit('kelas/nilai/setState', obj)
      }
    },
    santri: {
      get() {
        return this.getDataSantri
      },
      set(value) {
        const obj = { key: 'santri', value }
        this.$store.commit('report/lagger/setState', obj)
      }
    },

    dynamicKeys() {
      const excludeKeys = ["Nama", "SK"];
      // Pastikan data santri tidak kosong
      if (this.santri.length === 0) {
        return [];
      }

      const firstObject = this.santri[0];
      const allKeys = Object.keys(firstObject);
      // Filter key untuk menghilangkan "Nama" dan "SK"
      return allKeys.filter(key => !excludeKeys.includes(key));
    },
  },
  methods: {
    ...mapActions('report/lagger', ['getSantri', 'setPenilaian', 'changeUnit']),
    exportToExcel() {
      // Ambil tabel dari ref
      const ws = XLSX.utils.table_to_sheet(this.$refs.dataTable);

      // Buat workbook baru
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Lagger Mapel');

      // Generate file Excel
      const program = localStorage.getItem('program')
      const kelas = this.$auth.user.Kelas[program]
      XLSX.writeFile(wb, `Lagger ${kelas}.xlsx`);
    }
  },
};
</script>

<style scoped>
a {
  font-size: 12px;
}

select {
  font-size: 12px;
  width: fit-content !important;
}

span {
  font-size: 12px;
}

button {
  font-size: 12px;
}

.form-check-label {
  font-size: 12px;
}

.form-control {
  font-size: 12px;
  width: 60px;
}

input {
  padding: 5px;
}

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
