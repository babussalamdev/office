<template>
  <div class="animate__animated animate__fadeInUp">
    <h2 class="mb-3 mb-md-3">Penilaian Kelas</h2>
    <div class="head row mb-3">
      <div class="col-12 col-md-7 d-flex flex-column flex-md-row gap-4 gap-md-0 mb-3 mb-md-0">
        <div class="input-group w-75">
          <select class="form-select" aria-label="Default select example" v-model="selectedKelas" @change="applyFilter">
            <option value="" disabled selected>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">
              {{ data }}
            </option>
          </select>
          <select class="form-select" aria-label="Default select example" v-model="selectedMapel" @change="addNewData">
            <option value="" disabled selected>Mapel</option>
            <option v-for="(value, i) in uniqueLesson" :key="i" :value="value">
              {{ value.Nama }}
            </option>
          </select>
          <span class="input-group-text">
            {{ selectedMapel?.Jurusan }}
          </span>
        </div>
      </div>
      <div class="col-12 col-md-5 d-flex align-items-center justify-content-end gap-3">
        <!-- <d. -->
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
              <div v-if="isNumber(value)" @click.prevent="setEdit(index, value, key)" class="cursor-pointer">
                {{ value }}
              </div>
              <div v-else class="flex items-center gap-1">
                <input type="number" class="form-control" v-model="nilai" :placeholder="value" max="100">
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
      selectedKelas: "",
      periode: "",
      radio: "none",
      hadir: "",
      overlay: false,
      th: { Nama: '', Total: '' },
      newData: { uas: 30, uts: 30, ukk: 25 },
      editPenilaian: true,
    };
  },
  mounted() {
    document.addEventListener("click", event => this.setData(event, 'input'));
  },
  destroyed() {
    document.removeEventListener("click", event => this.setData(event, 'input'));
  },
  computed: {
    ...mapState("kelas/nilai", ['select', 'openEdit', 'globalLoad']),
    ...mapGetters('kelas/nilai', ['getSelectedMapel', 'getDataSantri', 'getNilai']),
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
        this.$store.commit('kelas/nilai/setState', obj)
      }
    },
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        const obj = { key: 'selectedMapel', value }
        this.$store.commit('kelas/nilai/setState', obj)
      }
    },
    uniqueClasses() {
      // Get unique classes from data
      const classes = this.select.map(item => item.Kelas);
      return [...new Set(classes)];
    },
    uniqueLesson() {
      return this.select.filter(item => {
        const matchesClass = item.Kelas === this.selectedKelas;
        this.selectedMapel = ''
        // this.santri = []
        // const matchesAsrama = item.Logs.asrama === this.selectedAsrama;
        // return matchesClass && matchesAsrama;
        return matchesClass
      });
    },
    general() {
      return this.select.find((x) => x.Nama === this.selectedMapel.Nama)
    },
  },
  methods: {
    ...mapActions('kelas/nilai', ['getSantri', 'setPenilaian']),
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
    // async getNilai() {
    //   const data = {
    //     kelas: this.kelas,
    //     mapel: this.mapel.Nama,
    //     jurusan: this.mapel.Jurusan,
    //     periode: `${this.periode.periode} ${this.periode.semester}`,
    //   };
    //   this.$store.dispatch("kelas/getNilai", data);
    // },
    // async selectPeriode() {
    //   this.$store.dispatch("kelas/selectPeriode");
    // },
    // async selectMapel() {
    //   this.$store.dispatch("kelas/selectMapel", this.kelas);
    // },
    async input(index) {
      $("#inputModal").modal("show");
      const updateData = this.santri[index];
      this.$store.commit("pelanggaran/updateData", updateData);
    },
    // async update(index, field) {
    //   const data = {
    //     index: index,
    //     field: field,
    //     value: this.dummy[index][field],
    //   };
    //   console.log(data);
    // },
    // kelasLoad() {
    //   const program = localStorage.getItem("program");
    //   const data = {
    //     program: program,
    //     kelas: this.kelas,
    //   };
    //   this.$store.dispatch(`santri/asrama/loadAsrama`, data);
    // },
    // async editItem(index) {
    //   $("#updateDataSantriKelas").modal("show");
    //   this.updateData = this.santri[index];
    // },
    // selectAllCheckbox() {
    //   for (const item of this.santri) {
    //     this.$set(this.selectedItems, item.SK, this.selectAll);
    //   }
    //   this.getCheckedNames();
    // },
    // getCheckedNames() {
    //   const checkedNames = Object.keys(this.selectedItems).filter(
    //     (key) => this.selectedItems[key]
    //   );
    //   this.data = checkedNames;
    // },
    // async editBulk(index) {
    //   $("#updateDataSantriAsrama").modal("show");
    //   this.updateData = this.data;
    // },
    // resetSelect() {
    //   this.data = [];
    //   this.selectAll = false;
    //   this.selectedItems = {};
    // },
  },
};
</script>

<style scoped>
a {
  font-size: 12px;
}

select {
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

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
