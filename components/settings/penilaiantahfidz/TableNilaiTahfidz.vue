<template>
  <div>
    <!-- Selection Area & Button -->
    <div class="row mb-4 align-items-end animate__animated animate__fadeInDown">
      <div class="col-md-5">
        <label for="tahunAjaran" class="form-label fw-bold">Tahun Ajaran</label>
        <select id="tahunAjaran" class="form-select" v-model="selectedTahun" @change="fetchData">
          <option value="" disabled>Pilih Tahun Ajaran</option>
          <option v-for="item in uniquePeriode" :key="item.Label" :value="item.Label">
            {{ item.Label }}
          </option>
        </select>
      </div>

      <div class="col-md-5">
        <label for="semester" class="form-label fw-bold">Semester</label>
        <select id="semester" class="form-select" v-model="selectedSemester" @change="fetchData">
          <option value="" disabled>Pilih Semester</option>
          <option value="ganjil">Ganjil</option>
          <option value="genap">Genap</option>
        </select>
      </div>

      <!-- Tambah Data Button (Only appears if both options are selected) -->
      <div class="col-md-2 text-end">
        <button
          v-if="selectedTahun && selectedSemester"
          type="button"
          class="btn btn-primary w-100 button-santri"
          data-bs-toggle="modal"
          data-bs-target="#inputnilaiquran">
          Tambah Data
        </button>
      </div>
    </div>

    <!-- Existing Table Area (Only appears if both options are selected) -->
    <div v-if="selectedTahun && selectedSemester" class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Kelas</th>
            <th scope="col">Semester</th>
            <th scope="col">Penilaian</th>
            <th scope="col">Pencapaian</th>
            <th scope="col" class="text-center">Total</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in quran" :key="i">
            <td scope="row">{{ data.SK.split("#")[3] }}</td>
            <td scope="row">{{ data.SK.split("#")[2] }}</td>
            <td scope="row">
              <div v-for="(value, index) in penilaian[i]" :key="index" style="display: inline">
                <div class="btn-group btn-group-sm px-0 py-0 me-1">
                  <div class="btn btn-secondary btn-sm disabled fs-6 align-middle">{{ value }}</div>
                  <div class="btn btn-secondary btn-sm" @click="delScore(index, data.SK)">
                    <i class="material-icons fs-6">close</i>
                  </div>
                </div>
              </div>
            </td>
            <td scope="row">{{ data.Pencapaian }} juz</td>
            <td scope="row" class="text-center">
              {{ totalNilai(penilaian[i]) }}
            </td>
            <td class="text-end">
              <a href="javascript:;" @click="inputScore(data.SK)">
                <button class="btn btn-sm btn-primary">
                  <i class="bx bx-plus"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
                <button class="btn btn-sm btn-danger">
                  <i class="bx bx-trash text-white"></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ModalNilaiTahfidz :selectedTahun="selectedTahun" :selectedSemester="selectedSemester" />
    <ModalPenilaianTahfidz />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from "vuex";

  export default {
    data() {
      return {
        urlXlsx: "",
        selectedTahun: "",
        selectedSemester: "",
      };
    },
    computed: {
      ...mapState("setuppenilaiantahfidz", ["quran", "penilaian", "periode"]),

      uniquePeriode() {
        if (!this.periode || this.periode.length === 0) return [];

        const unique = [];
        const map = new Map();

        for (const item of this.periode) {
          if (!map.has(item.Label)) {
            map.set(item.Label, true);
            unique.push({ Tahun: item.Tahun, Label: item.Label });
          }
        }
        return unique;
      },
    },
    created() {
      if (process.env.NODE_ENV !== "production") {
        this.urlXlsx = process.env.XlsxDev;
      } else {
        this.urlXlsx = process.env.XlsxPro;
      }
    },
    methods: {
      ...mapActions("setuppenilaiantahfidz", {
        deleteItem: "deleteItem",
        changeStep: "delScore",
        editItem: "editItem",
        changeUnit: "changeUnit",
      }),
      ...mapMutations("setuppenilaiantahfidz", ["inputScore"]),

      fetchData() {
        if (this.selectedTahun && this.selectedSemester) {
          this.changeUnit({
            tahun: this.selectedTahun,
            semester: this.selectedSemester,
          });
        }
      },

      delScore(index, sk) {
        const obj = { index, sk };
        this.changeStep(obj);
      },
      totalNilai(arr) {
        if (arr && arr.length > 0) {
          return arr
            .map((item) => {
              const parts = item.split("-");
              return parseFloat(parts[1]) || 0;
            })
            .reduce((acc, curr) => acc + curr, 0);
        }
        return 0;
      },
    },
  };
</script>

<style scoped>
  .fs-6 {
    font-size: 12px !important;
  }
  tr th {
    white-space: nowrap;
  }
  tr td {
    white-space: nowrap;
  }
</style>
