<template>
  <div class="animate__animated animate__fadeInUp">
    <h2 class="mb-3 mb-md-3">Report Nilai Tahfidz</h2>
    <div class="row mb-3">
      <div class="col-md-6 col-lg-4 col-12 d-flex">
        <select class="form-select" aria-label="Default select example" v-model="selectedLabel">
          <option value="" selected disabled>Label</option>
          <option v-for="(data, index) in label" :key="index" :value="index">{{ index }}</option>
        </select>
        <select class="form-select" aria-label="Default select example" v-model="selectedSemester"
          @change="changeUnitBySemester">
          <option value="" selected disabled>Semester</option>
          <option v-for="(data, index) in semester" :key="index" :value="data">{{ data.Semester }}</option>
        </select>
        <select class="form-select" aria-label="Default select example" v-model="selectedKelas" @change="addNewData">
          <option value="" selected disabled>Kelas</option>
          <option v-for="(data, index) in listKelas" :key="index" :value="data">{{ data.SK.split('#')[1] }}</option>
        </select>
      </div>
      <div class="col-12 col-md-6 col-lg-8 d-flex justify-content-end">
        <button class="btn btn-success border-0" @click="exportToExcel"
          :disabled="santri.length > 0 ? false : true">Export</button>
      </div>
    </div>
    <!-- <div class="d-flex justify-content-between mb-3 w-auto">
    </div> -->
    <div class="table-responsive" ref="input">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th class="text-uppercase" v-for="(value, key) in th" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
            </td>
            <td class="text-capitalize align-middle">
              <h1>{{ data.Halaqah }}</h1>
            </td>
            <td v-for="(value, key) in data.Penilaian" :key="key">
              <div class="cursor-pointer">
                {{ value.split('/')[0] }}
              </div>
            </td>
            <td class="text-capitalize align-middle">
              {{ data.TotalScore }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      btn: true,
    };
  },
  computed: {
    ...mapState("report/tahfidz/nilai", ['listKelas', 'label', 'semester', 'th']),
    ...mapGetters('report/tahfidz/nilai', ['getSelectedKelas', 'getDataSantri', 'getNilai', 'getSelectedLabel', 'getSelectedSemester']),
    santri: {
      get() {
        return this.getDataSantri
      },
      set(value) {
        const obj = { key: 'santri', value }
        this.$store.commit('report/nilaimapel/setState', obj)
      }
    },
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        const obj = { key: 'selectedKelas', value }
        this.$store.commit('report/tahfidz/nilai/setState', obj)
      }
    },
    selectedLabel: {
      get() {
        return this.getSelectedLabel
      },
      set(value) {
        this.$store.commit('report/tahfidz/nilai/setState', { key: 'selectedLabel', value })
      }
    },
    selectedSemester: {
      get() {
        return this.getSelectedSemester
      },
      set(value) {
        this.$store.commit('report/tahfidz/nilai/setState', { key: 'selectedSemester', value })
      }
    }
  },
  methods: {
    ...mapActions('report/tahfidz/nilai', ['getSantri', 'changeUnitBySemester']),
    isNumber(val) {
      // Periksa apakah val adalah angka dan bukan false
      return typeof val === 'number' && !isNaN(val);
    },
    calculateTotalFromPenilaian(penilaian) {
      // Hitung jumlah semua nilai dalam objek Penilaian
      return Object.values(penilaian).reduce((sum, value) => sum + value, 0);
    },
    applyFilter() {
      this.filteredData
    },
    addNewData() {
      this.getSantri()
    },
    exportToExcel() {
      const halaqah = this.selectedKelas
      const table = this.$refs.dataTable;
      const wb = XLSX.utils.table_to_book(table, { sheet: 'Nilai Santri' });
      XLSX.writeFile(wb, `Report Nilai Tahfidz ${halaqah.SK.split('#')[1]}.xlsx`);
    }
  },
};
</script>

<style scoped>
a {
  font-size: 12px;
}

.form-select {
  font-size: 12px;
  width: max-content !important;
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
</style>
