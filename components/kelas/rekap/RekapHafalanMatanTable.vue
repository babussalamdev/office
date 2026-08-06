<template>
  <div>
    <!-- Dropdown Selection Row -->
    <div class="row mb-3 align-items-center">
      <div class="col-12 col-md-4 mb-2 mb-md-0">
        <h2 class="mb-0 text-capitalize">Rekap Mutabaah Matan</h2>
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-md-end justify-content-start gap-2 flex-wrap">
        <select class="form-select w-auto shadow-sm" v-model="selectedMatan">
          <option value="" disabled>Pilih Matan...</option>
          <option v-for="(matan, index) in listMatan" :key="index" :value="matan.SK">
            {{ matan.Nama }}
          </option>
        </select>
      </div>
    </div>

    <!-- Filters & Export Row -->
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center shadow-sm">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0" @click="exportToExcel">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group shadow-sm">
          <span class="input-group-text" id="basic-addon1">From</span>
          <input type="date" class="form-control" v-model="start" />
          <span class="input-group-text" id="basic-addon1">To</span>
          <input type="date" class="form-control" v-model="end" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table ref="dataTable" class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" colspan="4" class="text-center">Hafalan Matan Baru</th>
          </tr>
          <tr>
            <th scope="col" class="text-start">Awal</th>
            <th scope="col" class="text-start">Akhir</th>
            <th scope="col" class="text-start">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <!-- Only show row if a Matan is selected and data exists -->
          <tr v-if="santri.length === 0 && selectedMatan">
            <td colspan="5" class="text-center py-4 text-muted">Tidak ada data untuk rentang tanggal ini.</td>
          </tr>
          <tr v-else-if="santri.length === 0 && !selectedMatan">
            <td colspan="5" class="text-center py-4 text-muted">Silakan pilih Matan terlebih dahulu.</td>
          </tr>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle" style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">
              Hal. {{ data.From }}
            </td>
            <td class="text-capitalize align-middle" style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">
              Hal. {{ data.To }}
            </td>
            <td class="text-capitalize align-middle">{{ data.Page }} Hal</td>
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
      ...mapState("rekaphafalanmatan", ["santri", "listMatan"]),
      ...mapGetters("rekaphafalanmatan", ["getStart", "getEnd", "getSelectedMatan"]),

      start: {
        get() {
          return this.getStart;
        },
        set(value) {
          this.$store.commit("rekaphafalanmatan/setState", { key: "start", value });
        },
      },
      end: {
        get() {
          return this.getEnd;
        },
        set(value) {
          this.$store.commit("rekaphafalanmatan/setState", { key: "end", value });
        },
      },
      selectedMatan: {
        get() {
          return this.getSelectedMatan;
        },
        set(value) {
          this.$store.commit("rekaphafalanmatan/setState", { key: "selectedMatan", value });
        },
      },
    },
    watch: {
      start() {
        this.changeUnit();
      },
      end() {
        this.changeUnit();
      },
      selectedMatan() {
        this.changeUnit();
      },
    },
    mounted() {
      // Fetch the available Matan when the page loads
      this.getMatanList();
    },
    methods: {
      ...mapActions("rekaphafalanmatan", ["changeUnit", "getMatanList"]),

      juz(value) {
        const juz = value / 20;
        return juz;
      },

      exportToExcel() {
        if (!this.selectedMatan) {
          this.$swal.fire({ icon: "warning", text: "Silakan pilih Matan terlebih dahulu." });
          return;
        }

        const program = localStorage.getItem("program");
        const halaqah = this.$auth.user.Halaqah[program];

        // Grab the Matan name for a cleaner file title
        const matanObj = this.listMatan.find((m) => m.SK === this.selectedMatan);
        const matanName = matanObj ? matanObj.Nama : "Matan";

        const table = this.$refs.dataTable;
        const wb = XLSX.utils.table_to_book(table, { sheet: "Hafalan Santri" });
        XLSX.writeFile(wb, `Rekap Ziyadah ${matanName} - ${halaqah}.xlsx`);
      },
    },
  };
</script>

<style scoped>
  tr th,
  tr td {
    white-space: nowrap;
  }
</style>
