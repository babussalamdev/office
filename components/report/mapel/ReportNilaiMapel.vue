<template>
  <div class="animate__animated animate__fadeInUp">
    <h2 class="mb-3 mb-md-3">Nilai Mapel</h2>
    <div class="head row mb-3">
      <div class="col-12 col-md-4 d-flex flex-column flex-md-row gap-4 gap-md-0 mb-3 mb-md-0">
        <div class="input-group">
          <select class="form-select" aria-label="Default select example" v-model="selectedMapel" @change="addNewData">
            <option value="" selected disabled>Mapel</option>
            <option v-for="(data, index) in mapel" :key="index" :value="data">{{ data.Nama }}</option>
          </select>
          <button class="btn btn-success border-0">Export</button>
          <!-- <select class="form-select" aria-label="Default select example" v-model="selectedKelas" @change="applyFilter">
            <option value="" selected>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">
              {{ data }}
            </option>
          </select>
          <select class="form-select" aria-label="Default select example" v-model="selectedMapel" @change="addNewData">
            <option value="" selected>Mapel</option>
            <option v-for="(value, i) in uniqueLesson" :key="i" :value="value">
              {{ value.Nama }}
            </option>
          </select>
          <span class="input-group-text">
            {{ selectedMapel?.Jurusan }}
          </span> -->
        </div>
      </div>
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
      th: { Nama: '', Total: '' },
    };
  },
  mounted() {
    document.addEventListener("click", event => this.setData(event, 'input'));
  },
  destroyed() {
    document.removeEventListener("click", event => this.setData(event, 'input'));
  },
  computed: {
    ...mapState("report/nilaimapel", ['mapel']),
    ...mapGetters('report/nilaimapel', ['getSelectedMapel', 'getDataSantri', 'getNilai']),
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
  },
  methods: {
    ...mapActions('report/nilaimapel', ['getSantri']),
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
      const newData = this.selectedMapel?.Penilaian || {};
      // Menyiapkan objek header baru
      const newHeaders = { Nama: '' };
      // Tambahkan data baru dari selectedMapel.Penilaian
      for (const [key, value] of Object.entries(newData)) {
        newHeaders[key] = value;
      }
      // Tambahkan 'Total' jika ada sebelumnya
      if (this.th.hasOwnProperty('Total')) {
        newHeaders['Total'] = this.th['Total'];
      }
      // Update th dengan header baru
      this.th = newHeaders;
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
