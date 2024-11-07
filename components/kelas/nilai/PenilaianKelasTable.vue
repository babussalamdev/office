<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <h2 class="mb-3 mb-md-3">Penilaian Kelas</h2>
      <div class="head row mb-3">
        <div class="col-12 col-md-6 d-flex flex-column flex-md-row gap-4 gap-md-0 mb-3 mb-md-0">
          <div class="input-group">
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
        <div class="col-12 col-md-6 d-flex align-items-center justify-content-end gap-3">
          <div v-if="selectedMapel.Status === 'close'" class="input-group input-excel">
            <input type="file" class="form-control form-control-sm" id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04" aria-label="Upload" ref="fileInput" />
            <span>
              <button v-if="btn2" class="btn btn-sm btn-success" type="button" id="inputGroupFileAddon04"
                @click="handleUpload(selectedMapel)">
                Tambah
              </button>
              <button v-else class="btn btn-success btn-sm" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span class="visually-hidden" role="status">Loading...</span>
              </button>
            </span>
          </div>
          <div v-else-if="santri.length > 0">
            <button class="btn btn-sm btn-warning" @click="handleExport(santri)"><i
                class="bi bi-upload me-2"></i>Export</button>
            <button type="button" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalImport"><i
                class="bi bi-download me-2"></i>Import</button>
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
    <PenilaianKelasModalImport />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
// import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
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
    ...mapState("kelas/nilai", ['select', 'openEdit']),
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
      this.santri = []
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

    handleExport(data) {
      if (data.length === 0) return;

      const penilaianKeys = new Set();
      data.forEach(item => {
        Object.keys(item.Penilaian).forEach(key => penilaianKeys.add(key));
      });

      const columns = ['Nama', 'SK', ...penilaianKeys];
      const processedData = data.map(item => ({
        Nama: item.Nama,
        SK: item.SK,
        ...item.Penilaian,
      }));

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`${this.selectedMapel.Nama} - ${this.selectedMapel.Kelas}.xlsx`);

      // Menambahkan header
      worksheet.addRow(columns);

      // Menambahkan data
      processedData.forEach(row => {
        worksheet.addRow(Object.values(row));
      });

      // Mengatur sel di baris lain menjadi tidak terkunci
      for (let rowIndex = 2; rowIndex <= processedData.length + 1; rowIndex++) { // Mulai dari 2
        const row = worksheet.getRow(rowIndex);

        // loop melalui penilaianKeys untuk sel dinamis
        let keyIndex = 0;
        penilaianKeys.forEach(() => {
          const cell = row.getCell(keyIndex + 3); // Tambah 3 untuk menggeser kolom sesuai header
          cell.protection = { locked: false };
          keyIndex++;
        });
      }

      // Mengaktifkan proteksi pada worksheet
      worksheet.protect('user123');

      // Menyimpan workbook sebagai file Excel
      // workbook.xlsx.writeFile(`${this.selectedMapel.Nama} - ${this.selectedMapel.Kelas}.xlsx`);
      workbook.xlsx.writeBuffer()
        .then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${this.selectedMapel.Nama} - ${this.selectedMapel.Kelas}.xlsx`;
          document.body.appendChild(link);
          link.click(); // Simulasikan klik untuk mendownload
          document.body.removeChild(link); // Hapus link setelah digunakan
        })
        .catch((error) => {
          console.error('Terjadi kesalahan saat menyimpan file:', error);
        });
    }

  }
}
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
