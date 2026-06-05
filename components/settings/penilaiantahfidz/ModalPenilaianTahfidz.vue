<template>
  <div>
    <!-- input modal -->
    <div class="modal fade" id="inputDataQuranPenilaian" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputDataPenilaian" id="inputQuranPenilaian">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Input Penilaian</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Updated Select Option to be dynamic -->
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <select name="nama" class="form-select" id="nama" v-model="selectedPenilaian" required>
                  <option value="" disabled>-- Pilih Penilaian --</option>
                  <option v-for="item in availablePenilaian" :key="item" :value="item">
                    {{ item }}
                  </option>
                </select>
              </div>

              <!-- Fixed label 'for' and input 'id' to match -->
              <div class="mb-3">
                <label for="bobot" class="form-label">Bobot</label>
                <input name="bobot" type="number" class="form-control" id="bobot" required max="100" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Simpan</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    data() {
      return {
        selectedPenilaian: "",
        // List of all possible Penilaian types
        allPenilaian: ["Ujian Juz", "Pencapaian", "UAS", "Adab Akhla"],
      };
    },
    computed: {
      ...mapState("setuppenilaiantahfidz", ["updateDataPenilaian", "btn"]),

      // Dynamically filter options
      availablePenilaian() {
        // If there's no data loaded yet, return all options
        if (!this.updateDataPenilaian || !this.updateDataPenilaian.Penilaian) {
          return this.allPenilaian;
        }

        // Get the keys (names) of the penilaian that already exist for this row
        // Example: If Penilaian is {"UAS": 35, "Pencapaian": 30}, usedNames will be ["UAS", "Pencapaian"]
        const usedNames = Object.keys(this.updateDataPenilaian.Penilaian);

        // Filter the allPenilaian array to only show items NOT in usedNames
        return this.allPenilaian.filter((item) => !usedNames.includes(item));
      },
    },
    watch: {
      // Whenever a new row is selected (which updates updateDataPenilaian),
      // reset the select dropdown to empty so it doesn't hold the previous value
      updateDataPenilaian() {
        this.selectedPenilaian = "";
      },
    },
    methods: {
      ...mapActions("setuppenilaiantahfidz", ["inputDataPenilaian"]),
    },
  };
</script>

<style lang="scss" scoped></style>
