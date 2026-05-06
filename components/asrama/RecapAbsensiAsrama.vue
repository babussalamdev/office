<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <!-- <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel" :disabled="santri.length > 0 ? false : true">Export</button>
        </div> -->
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <select class="form-select" aria-label="Default select example" v-model="selectedLabel">
            <option value="" selected disabled>Label</option>
            <option v-for="(data, index) in label" :key="index" :value="index">{{ index }}</option>
          </select>
          <select class="form-select" aria-label="Default select example" v-model="selectedSemester" @change="changeGetAsramaSemester">
            <option value="" selected disabled>Semester</option>
            <option v-for="(data, index) in semester" :key="index" :value="data">{{ data.Semester }}</option>
          </select>
          <select class="form-select" aria-label="Default select example" v-model="selectedAsrama" @change="addNewData">
            <!-- Add this line below to show "Asrama" when nothing is selected -->
            <option value="" selected disabled>Asrama</option>
            <option v-for="(data, index) in asrama" :key="index" :value="data">{{ data }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" colspan="5">Ketidakhadiran</th>
          </tr>
          <tr>
            <th scope="col" class="text-center bg-warning">S</th>
            <th scope="col" class="text-center bg-secondary">I</th>
            <th scope="col" class="text-center bg-danger">A</th>
            <th scope="col" class="text-center">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in values" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.absen }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.izin + data.sakit + data.absen }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
  import * as XLSX from "xlsx";

  export default {
    computed: {
      ...mapState("asramaAbsensi/rekap", ["asrama", "label", "semester", "values"]),
      ...mapGetters("asramaAbsensi/rekap", ["getSelectedLabel", "getSelectedAsrama", "getSelectedSemester"]),
      selectedAsrama: {
        get() {
          // If the store returns null or undefined, force it to return ""
          // This perfectly matches your <option value=""> placeholder!
          const value = this.getSelectedAsrama;
          return value === null || value === undefined ? "" : value;
        },
        set(value) {
          this.$store.commit("asramaAbsensi/rekap/setState", { key: "selectedAsrama", value });
        },
      },
      selectedLabel: {
        get() {
          return this.getSelectedLabel;
        },
        set(value) {
          this.$store.commit("asramaAbsensi/rekap/setState", { key: "selectedLabel", value });
        },
      },
      selectedSemester: {
        get() {
          const value = this.getSelectedSemester;
          return value === null || value === undefined ? "" : value;
        },
        set(value) {
          this.$store.commit("asramaAbsensi/rekap/setState", { key: "selectedSemester", value });
        },
      },
    },
    methods: {
      ...mapActions("asramaAbsensi/rekap", ["changeUnit", "getAsrama", "changeGetAsramaSemester", "getData"]),
      addNewData() {
        this.getData();
      },

      exportToExcel() {
        const table = this.$refs.dataTable;
        const program = localStorage.getItem("program");
        const halaqah = this.$auth.user.Halaqah[program];
        const clonedTable = table.cloneNode(true); // Clone tabel tanpa mempengaruhi tampilan asli

        // Menghapus kolom 'Action' dari salinan tabel
        const rows = clonedTable.querySelectorAll("tr");
        rows.forEach((row) => {
          const actionColumn = row.querySelector("td:last-child, th:last-child"); // Menargetkan kolom terakhir
          if (actionColumn) {
            actionColumn.remove(); // Menghapus kolom Action dari salinan
          }
        });

        // Mengonversi salinan tabel (tanpa kolom Action) menjadi workbook Excel
        const wb = XLSX.utils.table_to_book(clonedTable, { sheet: "Rekap Absensi Tahfidz" });
        XLSX.writeFile(wb, `Rekap Absensi ${halaqah}.xlsx`);
      },
    },
  };
</script>

<style scoped>
  tr th,
  tr td {
    white-space: nowrap;
  }

  select {
    font-size: 12px;
  }
</style>
