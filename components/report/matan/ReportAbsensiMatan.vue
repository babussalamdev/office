<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel" :disabled="santri.length > 0 ? false : true">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end flex-wrap gap-2">
        <div class="input-group w-100 d-flex justify-content-end gap-2">
          <!-- ADDED: Kelas Dropdown -->
          <select v-if="kelas.length > 0" class="form-select w-auto shadow-sm" v-model="selectedKelas">
            <option value="">Pilih Kelas</option>
            <option v-for="(data, index) in kelas" :value="data.Nama" :key="index">{{ data.Nama }}</option>
          </select>

          <!-- Matan Dropdown -->
          <select class="form-select w-auto shadow-sm" v-model="selectedMatan" @change="getDataSantri">
            <option value="" selected disabled>Pilih Matan...</option>
            <option v-for="(data, index) in select" :key="index" :value="data">{{ data.Nama }}</option>
          </select>

          <!-- Date Filters -->
          <div class="input-group w-auto shadow-sm">
            <span class="input-group-text" id="basic-addon1">From</span>
            <input type="date" class="form-control" v-model="start" :max="end" :disabled="!selectedMatan" />
            <span class="input-group-text" id="basic-addon1">To</span>
            <input type="date" class="form-control" v-model="end" :min="start" :disabled="!selectedMatan" />
          </div>
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
            <th scope="col" class="text-center bg-primary text-white">T</th>
            <th scope="col" class="text-center bg-warning">S</th>
            <th scope="col" class="text-center bg-secondary text-white">I</th>
            <th scope="col" class="text-center bg-danger text-white">A</th>
            <th scope="col" class="text-center">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <!-- Empty State Helpers -->
          <tr v-if="santri.length === 0 && selectedMatan">
            <td colspan="6" class="text-center py-4 text-muted">Tidak ada data untuk rentang tanggal ini.</td>
          </tr>
          <tr v-else-if="santri.length === 0 && !selectedMatan">
            <td colspan="6" class="text-center py-4 text-muted">Silakan pilih Matan terlebih dahulu.</td>
          </tr>

          <!-- Data Loop -->
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.absen }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat + data.izin + data.sakit + data.absen }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import * as XLSX from "xlsx";

  export default {
    computed: {
      // ADDED: 'kelas' mapped from state
      ...mapState("report/matan/absensi", ["select", "kelas"]),

      // ADDED: 'getSelectedKelas' mapped from getters
      ...mapGetters("report/matan/absensi", ["getStart", "getEnd", "getSelectedMatan", "getSantri", "getSelectedKelas"]),

      santri: {
        get() {
          return this.getSantri;
        },
        set(value) {
          this.$store.commit("report/matan/absensi/setState", { key: "santri", value });
        },
      },
      start: {
        get() {
          return this.getStart;
        },
        set(value) {
          this.$store.commit("report/matan/absensi/setState", { key: "start", value });
        },
      },
      end: {
        get() {
          return this.getEnd;
        },
        set(value) {
          this.$store.commit("report/matan/absensi/setState", { key: "end", value });
        },
      },
      selectedMatan: {
        get() {
          return this.getSelectedMatan;
        },
        set(value) {
          this.$store.commit("report/matan/absensi/setState", { key: "selectedMatan", value });
        },
      },
      // ADDED: Computed property for the v-model on your new select dropdown
      selectedKelas: {
        get() {
          return this.getSelectedKelas;
        },
        set(value) {
          this.$store.commit("report/matan/absensi/setState", { key: "selectedKelas", value });
        },
      },
    },
    watch: {
      start() {
        this.getDataSantriByDate();
      },
      end() {
        this.getDataSantriByDate();
      },
      // ADDED: Watcher to update matan list whenever the class changes
      selectedKelas() {
        // Reset selected matan and santri data when class changes
        this.$store.commit("report/matan/absensi/setState", { key: "selectedMatan", value: "" });
        this.$store.commit("report/matan/absensi/setState", { key: "santri", value: [] });
        this.changeUnit();
      },
    },
    mounted() {
      // Fetch initial data (Kelas & Matan) on component mount
      this.changeUnit();
    },
    methods: {
      ...mapActions("report/matan/absensi", ["changeUnit", "getDataSantri", "getDataSantriByDate"]),

      exportToExcel() {
        const table = this.$refs.dataTable;
        // Use the selected class for a cleaner file title
        const halaqah = this.selectedKelas || "Halaqah";
        const clonedTable = table.cloneNode(true);

        const rows = clonedTable.querySelectorAll("tr");
        rows.forEach((row) => {
          const actionColumn = row.querySelector("td:last-child, th:last-child");
          if (actionColumn) {
            actionColumn.remove();
          }
        });

        const wb = XLSX.utils.table_to_book(clonedTable, { sheet: "Report Absensi Matan" });
        XLSX.writeFile(wb, `Report Absensi Matan ${halaqah}.xlsx`);
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
