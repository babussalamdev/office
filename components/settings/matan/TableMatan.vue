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

      <!-- Tambah Data Button (Only appears if both options are selected) -->
      <div class="col-md-2 text-end">
        <button v-if="selectedTahun" type="button" class="btn btn-primary w-100 button-santri" data-bs-toggle="modal" data-bs-target="#inputmatan">
          Tambah Data
        </button>
      </div>
    </div>

    <!-- Existing Table Area (Only appears if both options are selected) -->
    <div v-if="selectedTahun" class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Kelas</th>
            <th scope="col">Nama Matan</th>
            <th scope="col">Pencapaian (Halaman)</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in matan" :key="i">
            <td scope="row">{{ data.SK.split("#")[2] }}</td>
            <td scope="row">{{ data.Nama }}</td>
            <td scope="row">{{ data?.Pencapaian || 0 }}</td>
            <td class="text-end">
              <a href="javascript:;" @click="updateItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-edit text-white"></i>
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

    <ModalInputMatan :selectedTahun="selectedTahun" />
    <ModalUpdateMatan />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from "vuex";

  export default {
    data() {
      return {
        selectedTahun: "",
      };
    },
    computed: {
      ...mapState("matan", ["matan", "penilaian", "periode"]),

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
    methods: {
      ...mapActions("matan", {
        deleteItem: "deleteItem",
        changeStep: "delScore",
        editItem: "editItem",
        changeUnit: "changeUnit",
      }),
      ...mapMutations("matan", ["updateItem"]),

      fetchData() {
        if (this.selectedTahun) {
          this.changeUnit({
            tahun: this.selectedTahun,
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
