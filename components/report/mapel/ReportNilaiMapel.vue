<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <div class="head row mb-3 row">
        <div class="col-12 col-md-6">
          <h2 class="mb-3 mb-md-3">Nilai Mapel</h2>
          <div class="d-flex flex-column flex-md-row gap-4 gap-md-0 mb-3 mb-md-0">
            <div class="input-group">
              <select class="form-select" aria-label="Default select example" v-model="selectedLabel">
                <option value="" selected disabled>Label</option>
                <option v-for="(data, index) in label" :key="index" :value="index">{{ index }}</option>
              </select>
              <select class="form-select" aria-label="Default select example" v-model="selectedSemester" @change="changeGetMapelSemester">
                <option value="" selected disabled>Semester</option>
                <option v-for="(data, index) in semester" :key="index" :value="data">{{ data.Semester }}</option>
              </select>
              <select
                v-if="kelas.length > 0"
                class="form-select"
                aria-label="Default select example"
                v-model="selectedKelas"
                @change="changeGetMapel">
                <option value="" selected disabled>Kelas</option>
                <option v-for="(data, index) in kelas" :key="index" :value="data">{{ data }}</option>
              </select>
              <select class="form-select" aria-label="Default select example" v-model="selectedMapel" @change="addNewData">
                <option value="" selected disabled>Mapel</option>
                <option v-for="(data, index) in mapel" :key="index" :value="data">{{ data.Nama }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 text-end">
          <h2 class="mb-3 mb-md-3">Input Nilai Bulk</h2>
          <div class="d-flex align-items-center justify-content-md-end justify-content-end gap-1">
            <button
              class="btn btn-sm btn-warning with-tooltip"
              @click="handleExport(santri)"
              data-bs-placement="top"
              data-bs-title="Export data nilai"
              :disabled="!santri || santri.length === 0">
              <i class="bi bi-upload me-2"></i>
              Export
            </button>
            <button
              type="button"
              class="btn btn-sm btn-success with-tooltip"
              data-bs-placement="top"
              data-bs-title="Masukan data nilai"
              data-bs-toggle="modal"
              data-bs-target="#modalImport"
              :disabled="!santri || santri.length === 0">
              <i class="bi bi-download me-2"></i>
              Import
            </button>
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
    <PenilaianReportNilaiMapelModalImport />
  </div>
</template>

<script>
  import { Tooltip } from "bootstrap"; // Make sure you have bootstrap installed
  import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
  import ExcelJS from "exceljs";

  export default {
    data() {
      return {
        btn: true,
      };
    },
    mounted() {
      document.addEventListener("click", (event) => this.setData(event, "input"));
      // Select all elements with the tooltip attribute
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"], .with-tooltip');

      // Initialize a Tooltip instance for each trigger
      const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    },
    destroyed() {
      document.removeEventListener("click", (event) => this.setData(event, "input"));
    },
    computed: {
      ...mapState("report/nilaimapel", ["mapel", "kelas", "label", "semester", "th"]),
      ...mapGetters("report/nilaimapel", [
        "getSelectedMapel",
        "getDataSantri",
        "getNilai",
        "getSelectedKelas",
        "getSelectedLabel",
        "getSelectedSemester",
      ]),
      santri: {
        get() {
          return this.getDataSantri;
        },
        set(value) {
          const obj = { key: "santri", value };
          this.$store.commit("report/nilaimapel/setState", obj);
        },
      },
      selectedMapel: {
        get() {
          return this.getSelectedMapel;
        },
        set(value) {
          const obj = { key: "selectedMapel", value };
          this.$store.commit("report/nilaimapel/setState", obj);
        },
      },
      selectedKelas: {
        get() {
          return this.getSelectedKelas;
        },
        set(value) {
          this.$store.commit("report/nilaimapel/setState", { key: "selectedKelas", value });
        },
      },
      selectedLabel: {
        get() {
          return this.getSelectedLabel;
        },
        set(value) {
          this.$store.commit("report/nilaimapel/setState", { key: "selectedLabel", value });
        },
      },
      selectedSemester: {
        get() {
          return this.getSelectedSemester;
        },
        set(value) {
          this.$store.commit("report/nilaimapel/setState", { key: "selectedSemester", value });
        },
      },
    },
    methods: {
      ...mapActions("report/nilaimapel", ["getSantri", "getMapel", "changeGetMapelSemester", "changeUnit"]),
      changeGetMapel() {
        this.getMapel();
      },
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
      },
      setData(event, data) {
        const dataOutside = this.$refs[data];

        // Memeriksa apakah elemen yang diklik berada di luar profile
        if (dataOutside && !dataOutside.contains(event.target)) {
          // this.falseData(data);
          if (this.nilai && this.openEdit) {
            this.setPenilaian({ type: "button" });
          }
        }
      },
      addNewData() {
        this.getSantri();
      },
      setEdit(index, i, key) {
        const obj = { index, i, key };
        this.setPenilaian(obj);
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
          `${this.selectedMapel.Nama}_${this.selectedKelas}_${this.selectedLabel.replace("/", "-")}_${this.selectedSemester.Semester}.xlsx`,
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
            link.download = `${this.selectedMapel.Nama}_${this.selectedKelas}_${this.selectedLabel.replace("/", "-")}_${
              this.selectedSemester.Semester
            }.xlsx`;
            document.body.appendChild(link);
            link.click(); // Simulasikan klik untuk mendownload
            document.body.removeChild(link); // Hapus link setelah digunakan
          })
          .catch((error) => {
            console.error("Terjadi kesalahan saat menyimpan file:", error);
          });
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
