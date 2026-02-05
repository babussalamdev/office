<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <div class="head row mb-3">
        <div class="col-12 col-md-6">
          <h2 class="mb-3 mb-md-3">Penilaian Kelas</h2>
          <div class="d-flex flex-column flex-md-row gap-4 gap-md-0 mb-3 mb-md-0">
            <div class="input-group">
              <select class="form-select" v-model="localKelas" @change="resetOnKelasChange">
                <option value="" disabled selected>Kelas</option>
                <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">
                  {{ data }}
                </option>
              </select>

              <select class="form-select select" v-model="localSemester" @change="resetOnSemesterChange" :disabled="!localKelas">
                <option value="" selected disabled>Semester</option>
                <option v-for="(data, index) in semesterOptions" :key="index" :value="data.Semester">
                  {{ data.Semester }}
                </option>
              </select>

              <select class="form-select" v-model="localMapel" @change="addNewData" :disabled="!localSemester">
                <option value="" disabled selected>Mapel</option>
                <option v-for="(value, i) in uniqueLesson" :key="i" :value="value">
                  {{ value.Nama }}
                </option>
              </select>

              <span class="input-group-text">
                {{ localMapel?.Jurusan || "-" }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 text-end">
          <h2 v-if="santri.length > 0" class="mb-3 mb-md-3">Input Nilai Bulk</h2>
          <h2 v-if="localMapel && localMapel.Status === 'close'" class="mb-3 mb-md-3">Input Program Tahun ajaran</h2>
          <div class="d-flex align-items-center justify-content-end gap-3">
            <div v-if="localMapel && localMapel.Status === 'close'" class="input-group input-excel">
              <input
                type="file"
                class="form-control form-control-sm"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                ref="fileInput" />
              <span>
                <button v-if="btn2" class="btn btn-sm btn-success" type="button" id="inputGroupFileAddon04" @click="handleUpload(localMapel)">
                  Tambah
                </button>
                <button v-else class="btn btn-success btn-sm" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </span>
            </div>

            <div v-else-if="santri.length > 0">
              <button class="btn btn-sm btn-warning" @click="handleExport(santri)">
                <i class="bi bi-upload me-2"></i>
                Export
              </button>
              <button type="button" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalImport">
                <i class="bi bi-download me-2"></i>
                Import
              </button>
            </div>
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
          <tbody v-if="localMapel && localMapel.Status !== 'close'">
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
              </td>
              <td v-for="(value, key) in data.Penilaian" :key="key">
                <div v-if="isNumber(value)" @click.prevent="setEdit(index, value, key)" class="cursor-pointer">
                  {{ value }}
                </div>
                <div v-else class="flex items-center gap-1">
                  <input type="number" class="form-control" v-model="nilai" :placeholder="value" max="100" />
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
  import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
  import ExcelJS from "exceljs";
  import { Tooltip } from "bootstrap"; // Make sure you have bootstrap installed

  export default {
    data() {
      return {
        btn: true,
        btn2: true,
        radio: "none",
        hadir: "",
        overlay: false,
        th: { Nama: "", Total: "" },
        editPenilaian: true,
      };
    },
    mounted() {
      if (!this.$store.state.index.label) {
        this.$router.push("/");
        return; // Stop execution here
      }
      // 1. Existing listener
      document.addEventListener("click", (event) => this.setData(event, "input"));

      // 2. ADD THIS: Trigger the action to fetch settings & mapel on load
      // We check if semesterOptions is empty to avoid double-fetching if not needed
      if (this.semesterOptions.length === 0) {
        this.changeUnit();
      }
    },
    destroyed() {
      document.removeEventListener("click", (event) => this.setData(event, "input"));
    },
    computed: {
      ...mapState("index", ["semester"]), // Global semester (optional use)
      ...mapState("kelas/nilai", ["select", "openEdit", "selectedKelas", "selectedSemester", "selectedMapel", "semesterOptions"]),
      ...mapGetters("kelas/nilai", ["getDataSantri", "getNilai"]), // Removed getSelectedMapel as we mapState directly

      // 1. Computed for Kelas (Syncs with Vuex)
      localKelas: {
        get() {
          return this.selectedKelas;
        },
        set(value) {
          this.$store.commit("kelas/nilai/setState", { key: "selectedKelas", value });
        },
      },

      // 2. Computed for Semester (Syncs with Vuex)
      localSemester: {
        get() {
          return this.selectedSemester;
        },
        set(value) {
          this.$store.commit("kelas/nilai/setState", { key: "selectedSemester", value });
        },
      },

      // 3. Computed for Mapel (Syncs with Vuex)
      localMapel: {
        get() {
          return this.selectedMapel;
        },
        set(value) {
          this.$store.commit("kelas/nilai/setState", { key: "selectedMapel", value });
        },
      },

      nilai: {
        get() {
          return this.getNilai;
        },
        set(value) {
          const obj = { key: "nilai", value };
          this.$store.commit("kelas/nilai/setState", obj);
        },
      },
      santri: {
        get() {
          return this.getDataSantri;
        },
        set(value) {
          const obj = { key: "santri", value };
          this.$store.commit("kelas/nilai/setState", obj);
        },
      },

      uniqueClasses() {
        // Get unique classes from data
        const classes = this.select.map((item) => item.Kelas);
        return [...new Set(classes)];
      },

      uniqueLesson() {
        // Filter using the SELECTED semester from dropdown (localSemester)
        if (!this.localKelas || !this.localSemester) return [];

        return this.select.filter((item) => {
          const matchesClass = item.Kelas === this.localKelas;

          // Match SK with the selected semester string (e.g., "ganjil")
          const matchesSemester = item.SK && item.SK.toLowerCase().includes(this.localSemester.toLowerCase());

          return matchesClass && matchesSemester;
        });
      },
    },
    methods: {
      ...mapActions("kelas/nilai", ["getSantri", "setPenilaian", "changeUnit"]),
      isNumber(val) {
        // Periksa apakah val adalah angka dan bukan false
        return typeof val === "number" && !isNaN(val);
      },
      calculateTotalFromPenilaian(penilaian) {
        // Hitung jumlah semua nilai dalam objek Penilaian
        return Object.values(penilaian).reduce((sum, value) => sum + value, 0);
      },
      applyFilter() {
        this.filteredData;
        this.santri = [];
      },
      setData(event, data) {
        const dataOutside = this.$refs[data];

        // Memeriksa apakah elemen yang diklik berada di luar profile
        if (dataOutside && !dataOutside.contains(event.target)) {
          // this.falseData(data);
          if (!this.nilai && this.openEdit) {
            Swal.fire({
              title: "Warning!",
              text: "Nilai tidak boleh kosong!",
              icon: "warning",
              timer: 1500,
              showConfirmButton: false,
            });
          } else if (this.nilai && this.openEdit) {
            this.setPenilaian({ type: "button" });
          }
        }
      },
      // RESET FUNCTIONS
      resetOnKelasChange() {
        // If Kelas changes, reset Semester, Mapel, and Data
        this.localSemester = "";
        this.localMapel = "";
        this.santri = [];
        this.th = { Nama: "", Total: "" };
      },

      resetOnSemesterChange() {
        this.localMapel = "";
        this.santri = [];
        this.th = { Nama: "", Total: "" };
      },
      addNewData() {
        // 1. Safety check
        if (!this.localMapel) return;

        // 2. CHECK STATUS: If status is 'close', show popup and stop.
        if (this.localMapel.Status === "close") {
          Swal.fire({
            icon: "warning",
            title: "Perhatian",
            text: "Penilaian belum di setup, mohon untuk menginput program tahun ajaran ke kolom yang tersedia",
            confirmButtonColor: "#f39c12", // Optional: matches warning color
          });

          // Clear the table headers and data so previous mapel data doesn't persist
          this.th = { Nama: "", Total: "" };
          this.santri = [];

          // Return early so we DO NOT run the logic below (header creation & getSantri)
          return;
        }

        // 3. NORMAL FLOW (Only runs if status is NOT close)
        const newData = this.localMapel?.Penilaian || {};

        // Prepare headers
        const newHeaders = { Nama: "" };
        for (const [key, value] of Object.entries(newData)) {
          newHeaders[key] = value;
        }

        // Preserve 'Total' header if it exists
        if (this.th.hasOwnProperty("Total")) {
          newHeaders["Total"] = this.th["Total"];
        }

        this.th = newHeaders;

        // Fetch data from API
        this.getSantri();
      },
      setEdit(index, i, key) {
        const obj = { index, i, key };
        this.setPenilaian(obj);
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
        if (file && file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
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
            const request = { formData: base64String };
            const subject = selected.Nama;
            const sk = selected.SK.replace(/#/g, "%23");
            const kelas = selected.Kelas;
            const data = await this.$apiBase.$put(`upload-mapel?type=mapel&subject=${subject}&sk=${sk}&program=${program}&kelas=${kelas}`, request);
            if (data) {
              Swal.fire({
                position: "center",
                icon: "success",
                text: "Data berhasil diinput",
                showConfirmButton: false,
                timer: 1500,
              });
              $("#inputGroupFile04").val("");
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
        data.forEach((item) => {
          Object.keys(item.Penilaian).forEach((key) => penilaianKeys.add(key));
        });

        const columns = ["Nama", "SK", ...penilaianKeys];
        const processedData = data.map((item) => ({
          Nama: item.Nama,
          SK: item.SK,
          ...item.Penilaian,
        }));

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(
          `${this.selectedMapel.Nama}_${this.selectedKelas}_${this.$store.state.index.label.replace("/", "-")}_${this.selectedSemester}.xlsx`,
        );

        // Menambahkan header
        worksheet.addRow(columns);

        // Menambahkan data
        processedData.forEach((row) => {
          worksheet.addRow(Object.values(row));
        });

        // Mengatur sel di baris lain menjadi tidak terkunci
        for (let rowIndex = 2; rowIndex <= processedData.length + 1; rowIndex++) {
          // Mulai dari 2
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
        worksheet.protect("user123");

        // Menyimpan workbook sebagai file Excel
        // workbook.xlsx.writeFile(`${this.selectedMapel.Nama} - ${this.selectedMapel.Kelas}.xlsx`);
        workbook.xlsx
          .writeBuffer()
          .then((buffer) => {
            const blob = new Blob([buffer], { type: "application/octet-stream" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${this.selectedMapel.Nama}_${this.selectedKelas}_${this.$store.state.index.label.replace("/", "-")}_${
              this.selectedSemester
            }.xlsx`;
            document.body.appendChild(link);
            link.click(); // Simulasikan klik untuk mendownload
            document.body.removeChild(link); // Hapus link setelah digunakan
          })
          .catch((error) => {
            console.error("Terjadi kesalahan saat menyimpan file:", error);
          });
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
