<template>
  <div class="animate__animated animate__fadeInUp">
    <div class="mb-3 d-flex align-items-center justify-content-between">
      <h2>Penilaian Tahfidz{{ permissions.includes('absensi pengampu') ? ' - koordinator' : '' }}</h2>
      <select v-if="permissions.includes('absensi pengampu')" class="form-select" v-model="selectedByHalaqah"
        @change="getByHalaqah()">
        <option value="">halaqah</option>
        <option v-for="(data, index) in selectHalaqah" :value="data" :key="index">{{ data }}</option>
      </select>
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
              <div v-if="isNumber(value) || isNaN(value)" @click.prevent="setEdit(index, value, key)" class="cursor-pointer" :class="isNaN(value) ? 'text-danger' : ''">
                {{ value }}
              </div>
              <div v-else class="flex items-center gap-1">
                <input type="number" class="form-control" v-model="nilai" max="100">
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
    ...mapState("tahfidznilai", ['select', 'openEdit', 'example', 'th', 'nilai', 'selectHalaqah']),
    ...mapState('index', ['permissions']),
    ...mapGetters('tahfidznilai', ['getSelectedMapel', 'getDataSantri', 'getNilai', 'getSelectedHalaqah']),
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
    selectedByHalaqah: {
      get() {
        return this.getSelectedHalaqah
      },
      set(value) {
        this.$store.commit('tahfidznilai/setState', { key: 'selectedByHalaqah', value })
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
    ...mapActions('tahfidznilai', ['getSantri', 'setPenilaian', 'getByHalaqah']),
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
        if (!this.nilai && this.openEdit) {
          Swal.fire({
            title: 'Warning!',
            text: 'Nilai tidak boleh kosong!',
            icon: 'warning',
            timer: 1500,
            showConfirmButton: false
          });
        } else if (this.nilai && this.openEdit) {
          this.setPenilaian({ type: 'button' })
        }
      }
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
          if (data) {
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
