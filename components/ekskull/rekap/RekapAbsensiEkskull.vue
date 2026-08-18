<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-4 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel" :disabled="santri.length === 0">Export</button>
        </div>
      </div>

      <div class="col-12 col-md-8 d-flex justify-content-end flex-wrap gap-2">
        <div class="input-group w-auto">
          <!-- Dropdown Ekskull -->
          <select class="form-select" v-model="selectedEkskull" @change="getDataSantri">
            <option value="" selected disabled>Pilih Ekskull</option>
            <option v-for="(data, index) in ekskullOptions" :key="index" :value="data">
              {{ data }}
            </option>
          </select>

          <!-- Date Pickers -->
          <span class="input-group-text bg-light">From</span>
          <input type="date" class="form-control" v-model="start" :max="end" :disabled="!selectedEkskull" />
          <span class="input-group-text bg-light">To</span>
          <input type="date" class="form-control" v-model="end" :min="start" :disabled="!selectedEkskull" />
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
          <!-- State 1: No Ekskull OR Missing Dates -->
          <tr v-if="!selectedEkskull || !start || !end">
            <td colspan="6" class="text-center text-muted py-4">Silakan pilih Ekskull dan Rentang Tanggal terlebih dahulu</td>
          </tr>

          <!-- State 2: Ekskull & Dates Selected, but Data is Empty -->
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
      // NOTE: Ensure your namespace matches your store configuration (e.g., "ekskullAbsensi/rekap")
      ...mapState("ekskullAbsensi/rekap", ["ekskullOptions"]),
      ...mapGetters("ekskullAbsensi/rekap", ["getStart", "getEnd", "getSelectedEkskull", "getSantri"]),

      selectedEkskull: {
        get() {
          return this.getSelectedEkskull;
        },
        set(value) {
          this.$store.commit("ekskullAbsensi/rekap/setState", { key: "selectedEkskull", value });
        },
      },
      santri: {
        get() {
          return this.getSantri;
        },
        set(value) {
          this.$store.commit("ekskullAbsensi/rekap/setState", { key: "santri", value });
        },
      },
      start: {
        get() {
          return this.getStart;
        },
        set(value) {
          this.$store.commit("ekskullAbsensi/rekap/setState", { key: "start", value });
        },
      },
      end: {
        get() {
          return this.getEnd;
        },
        set(value) {
          this.$store.commit("ekskullAbsensi/rekap/setState", { key: "end", value });
        },
      },
    },
    watch: {
      start() {
        if (this.selectedEkskull) this.getDataSantriByDate();
      },
      end() {
        if (this.selectedEkskull) this.getDataSantriByDate();
      },
    },
    mounted() {
      this.changeUnit();
    },
    beforeDestroy() {
      this.selectedEkskull = "";
      this.santri = [];
    },
    methods: {
      ...mapActions("ekskullAbsensi/rekap", ["changeUnit", "getDataSantri", "getDataSantriByDate"]),

      exportToExcel() {
        const table = this.$refs.dataTable;
        const ekskull = this.selectedEkskull || "Unknown_Ekskull";
        const clonedTable = table.cloneNode(true);

        const rows = clonedTable.querySelectorAll("tr");
        rows.forEach((row) => {
          const actionColumn = row.querySelector("td:last-child, th:last-child");
          if (actionColumn) {
            // Keep this logic if you plan to add action columns later,
            // otherwise, it safely ignores it if there are no action columns to remove.
          }
        });

        const wb = XLSX.utils.table_to_book(clonedTable, { sheet: "Rekap Absensi Ekskull" });
        XLSX.writeFile(wb, `Rekap Absensi Ekskull ${ekskull}.xlsx`);
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
