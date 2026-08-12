<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-4 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel" :disabled="santri.length === 0">Export</button>
        </div>
      </div>
      <!-- Added gap-2 for spacing between elements -->
      <div class="col-12 col-md-8 d-flex justify-content-end flex-wrap gap-2">
        <!-- Dropdown Kelas: Added dynamically -->
        <select class="form-select w-auto" v-model="selectedKelas" @change="handleKelasChange">
          <option value="" disabled>Pilih Kelas</option>
          <option v-for="(k, index) in kelas" :key="index" :value="k.Nama">{{ k.Nama }}</option>
        </select>

        <div class="input-group w-auto">
          <!-- Dropdown Matan -->
          <select class="form-select" v-model="selectedMatan" @change="getDataSantri">
            <option value="" selected disabled>Matan</option>
            <option v-for="(data, index) in select" :key="index" :value="data">{{ data.Nama }}</option>
          </select>
          <span class="input-group-text bg-light">From</span>
          <input type="date" class="form-control" v-model="start" :max="end" :disabled="!selectedMatan" />
          <span class="input-group-text bg-light">To</span>
          <input type="date" class="form-control" v-model="end" :min="start" :disabled="!selectedMatan" />
        </div>
      </div>
    </div>

    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start align-middle">Nama</th>
            <th scope="col" colspan="5" class="text-center">Ketidakhadiran</th>
          </tr>
          <tr>
            <th scope="col" class="text-center bg-primary text-white">T</th>
            <th scope="col" class="text-center bg-warning text-dark">S</th>
            <th scope="col" class="text-center bg-secondary text-white">I</th>
            <th scope="col" class="text-center bg-danger text-white">A</th>
            <th scope="col" class="text-center">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <!-- State 1: No Matan OR Missing Dates -->
          <tr v-if="!selectedMatan || !start || !end">
            <td colspan="6" class="text-center text-muted py-4">Silakan pilih Matan dan Rentang Tanggal terlebih dahulu</td>
          </tr>

          <!-- State 2: Matan & Dates Selected, but Data is Empty -->
          <tr v-else-if="santri.length === 0">
            <td colspan="6" class="text-center text-muted py-4">Tidak ada data absensi untuk rentang tanggal ini</td>
          </tr>

          <!-- State 3: Data Available -->
          <tr v-else v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.absen }}</td>
            <td class="text-capitalize align-middle text-center font-weight-bold">{{ data.terlambat + data.izin + data.sakit + data.absen }}</td>
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
      ...mapState("matanAbsensi/rekap", ["select", "kelas"]),
      ...mapGetters("matanAbsensi/rekap", ["getStart", "getEnd", "getSelectedMatan", "getSantri", "getSelectedKelas"]),

      kelas: {
        get() {
          return this.$store.state.matanAbsensi.rekap.kelas;
        },
      },
      selectedKelas: {
        get() {
          return this.getSelectedKelas;
        },
        set(value) {
          this.$store.commit("matanAbsensi/rekap/setState", { key: "selectedKelas", value });
        },
      },
      santri: {
        get() {
          return this.getSantri;
        },
        set(value) {
          this.$store.commit("matanAbsensi/rekap/setState", { key: "santri", value });
        },
      },
      start: {
        get() {
          return this.getStart;
        },
        set(value) {
          this.$store.commit("matanAbsensi/rekap/setState", { key: "start", value });
        },
      },
      end: {
        get() {
          return this.getEnd;
        },
        set(value) {
          this.$store.commit("matanAbsensi/rekap/setState", { key: "end", value });
        },
      },
      selectedMatan: {
        get() {
          return this.getSelectedMatan;
        },
        set(value) {
          this.$store.commit("matanAbsensi/rekap/setState", { key: "selectedMatan", value });
        },
      },
    },
    watch: {
      start() {
        if (this.selectedMatan) this.getDataSantriByDate();
      },
      end() {
        if (this.selectedMatan) this.getDataSantriByDate();
      },
    },
    mounted() {
      // Trigger initial load of classes and matans
      this.changeUnit();
    },
    methods: {
      ...mapActions("matanAbsensi/rekap", ["changeUnit", "getDataSantri", "getDataSantriByDate"]),

      async handleKelasChange() {
        this.selectedMatan = ""; // Reset Matan dropdown
        this.santri = []; // Clear table data
        await this.changeUnit(true); // Re-fetch Matans based on new class
      },

      exportToExcel() {
        const table = this.$refs.dataTable;
        // Use the dynamically selected class instead of auth user data
        const halaqah = this.selectedKelas || "Unknown_Class";
        const clonedTable = table.cloneNode(true);

        const rows = clonedTable.querySelectorAll("tr");
        rows.forEach((row) => {
          const actionColumn = row.querySelector("td:last-child, th:last-child");
          if (actionColumn) {
            actionColumn.remove();
          }
        });

        const wb = XLSX.utils.table_to_book(clonedTable, { sheet: "Rekap Absensi Matan" });
        XLSX.writeFile(wb, `Rekap Absensi Matan ${halaqah}.xlsx`);
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
