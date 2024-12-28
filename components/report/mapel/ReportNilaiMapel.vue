<template>
  <div class="animate__animated animate__fadeInUp">
    <h2 class="mb-3 mb-md-3">Nilai Mapel</h2>
    <div class="d-flex justify-content-between mb-3 w-auto">
      <div class="d-flex">
        <select class="form-select" aria-label="Default select example" v-model="selectedLabel">
          <option value="" selected disabled>Label</option>
          <option v-for="(data, index) in label" :key="index" :value="index">{{ index }}</option>
        </select>
        <select class="form-select" aria-label="Default select example" v-model="selectedSemester"
          @change="changeGetMapelSemester">
          <option value="" selected disabled>Semester</option>
          <option v-for="(data, index) in semester" :key="index" :value="data">{{ data.Semester }}</option>
        </select>
        <select v-if="kelas.length > 0" class="form-select" aria-label="Default select example" v-model="selectedKelas"
          @change="changeGetMapel">
          <option value="" selected disabled>Kelas</option>
          <option v-for="(data, index) in kelas" :key="index" :value="data">{{ data }}</option>
        </select>
        <select class="form-select" aria-label="Default select example" v-model="selectedMapel" @change="addNewData">
          <option value="" selected disabled>Mapel</option>
          <option v-for="(data, index) in mapel" :key="index" :value="data">{{ data.Nama }}</option>
        </select>
      </div>
      <!-- <button class="btn btn-success border-0">Export</button> -->
    </div>
    <div class="table-responsive" ref="input">
      <table class="table table-hover table-striped">
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
            <td v-for="(value, key) in data.Penilaian" :key="key">
              <div class="cursor-pointer">
                {{ value }}
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
export default {
  data() {
    return {
      btn: true,
    };
  },
  mounted() {
    document.addEventListener("click", event => this.setData(event, 'input'));
  },
  destroyed() {
    document.removeEventListener("click", event => this.setData(event, 'input'));
  },
  computed: {
    ...mapState("report/nilaimapel", ['mapel', 'kelas', 'label', 'semester', 'th']),
    ...mapGetters('report/nilaimapel', ['getSelectedMapel', 'getDataSantri', 'getNilai', 'getSelectedKelas', 'getSelectedLabel', 'getSelectedSemester']),
    santri: {
      get() {
        return this.getDataSantri
      },
      set(value) {
        const obj = { key: 'santri', value }
        this.$store.commit('report/nilaimapel/setState', obj)
      }
    },
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        const obj = { key: 'selectedMapel', value }
        this.$store.commit('report/nilaimapel/setState', obj)
      }
    },
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('report/nilaimapel/setState', { key: 'selectedKelas', value })
      }
    },
    selectedLabel: {
      get() {
        return this.getSelectedLabel
      },
      set(value) {
        this.$store.commit('report/nilaimapel/setState', { key: 'selectedLabel', value })
      }
    },
    selectedSemester: {
      get() {
        return this.getSelectedSemester
      },
      set(value) {
        this.$store.commit('report/nilaimapel/setState', { key: 'selectedSemester', value })
      }
    }
  },
  methods: {
    ...mapActions('report/nilaimapel', ['getSantri', 'getMapel', 'changeGetMapelSemester', 'changeUnit']),
    changeGetMapel() {
      this.getMapel()
    },
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
    setData(event, data) {
      const dataOutside = this.$refs[data];

      // Memeriksa apakah elemen yang diklik berada di luar profile
      if (dataOutside && !dataOutside.contains(event.target)) {
        // this.falseData(data);
        if (this.nilai && this.openEdit) {
          this.setPenilaian({ type: 'button' })
        }
      }
    },
    addNewData() {
      this.getSantri()
    },
    setEdit(index, i, key) {
      const obj = { index, i, key }
      this.setPenilaian(obj)
    },
    async input(index) {
      $("#inputModal").modal("show");
      const updateData = this.santri[index];
      this.$store.commit("pelanggaran/updateData", updateData);
    },
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
