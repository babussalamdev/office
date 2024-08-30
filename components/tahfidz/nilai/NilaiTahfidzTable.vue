<template>
  <div class="animate__animated animate__fadeInUp">
    <h2 class="mb-3 mb-md-3">Penilaian Kelas</h2>
    <div class="head row mb-3">
      <div class="col-12 col-md-7 d-flex flex-column flex-md-row gap-4 gap-md-0 mb-3 mb-md-0">
        <div class="input-group w-75">
          <select class="form-select" v-model="selectedKelas" @change="applyFilter">
            <option value="" disabled selected>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">
              {{ data }}
            </option>
          </select>
          <select class="form-select" v-model="selectedMapel" @change="addNewData">
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
      </div>
    </div>
    <div class="table-responsive" ref="input">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th class="text-uppercase" v-for="(value, key) in th" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody v-if="selectedMapel.Status !== 'close'">
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
import Swal from "sweetalert2";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      btn: true,
      btn2: true,
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
    ...mapState("tahfidznilai", ['select', 'openEdit']),
    ...mapGetters('tahfidznilai', ['getSelectedMapel', 'getDataSantri', 'getNilai']),
    nilai: {
      get() {
        return this.getNilai
      },
      set(value) {
        const obj = { key: 'nilai', value }
        this.$store.commit('tahfidznilai/setState', obj)
      }
    },
    santri: {
      get() {
        return this.getDataSantri
      },
      set(value) {
        const obj = { key: 'santri', value }
        this.$store.commit('tahfidznilai/setState', obj)
      }
    },
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        const obj = { key: 'selectedMapel', value }
        this.$store.commit('tahfidznilai/setState', obj)
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
    ...mapActions('tahfidznilai', ['getSantri', 'setPenilaian']),
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
    async handleUpload(selected) {
      const file = this.$refs.fileInput.files[0]; // Dapatkan file dari input file
      const reader = new FileReader();

      // Validasi jenis file
      if (
        file &&
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Tampilkan notifikasi menggunakan Sweet Alert jika jenis file tidak sesuai
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Only .xlsx files are allowed",
        });
        return; // Hentikan eksekusi jika jenis file tidak sesuai
      }

      reader.onload = async () => {
        this.btn2 = false;
        try {
          const base64String = reader.result.split(",")[1];
          const program = localStorage.getItem("program");
          const request = { formData: base64String }
          const subject = selected.Nama
          const sk = selected.SK.replace(/#/g, '%23')
          const kelas = selected.Kelas
          const data = await this.$apiBase.$put(
            `upload-mapel?type=mapel&subject=${subject}&sk=${sk}&program=${program}&kelas=${kelas}`, request
          )
          if(data) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Data berhasil diinput",
              showConfirmButton: false,
              timer: 1500,
            });
            $('#inputGroupFile04').val('');
          }
          this.btn2 = true;
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "Data gagal diinput, Mohon periksa kembali!",
            showConfirmButton: false,
            timer: 2000,
          });
          this.btn2 = true;
          console.log(error);
        }
      };

      // Periksa apakah file telah dipilih
      if (file) {
        reader.readAsDataURL(file); // Baca konten file sebagai data URL
      } else {
        // Tampilkan notifikasi jika file belum dipilih
        Swal.fire({
          icon: "error",
          title: "File Not Selected",
          text: "Please select a file",
        });
      }
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

.input-excel input {
  padding: 6px 12px;
}

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
