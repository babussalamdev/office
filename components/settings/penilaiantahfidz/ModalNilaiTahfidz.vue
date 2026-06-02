<template>
  <div>
    <!-- input modal -->
    <div class="modal fade" id="inputnilaiquran" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="submit" id="inputQuran">
            <div class="modal-header">
              <!-- Removed {{ quran }} from here to keep the title clean -->
              <h1 class="modal-title fs-5">Input Nilai Quran</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- KELAS SELECT -->
              <div class="mb-3">
                <label for="kelas" class="form-label">Kelas</label>
                <select name="Kelas" id="kelas" class="form-select" v-model="selectedKelas" required>
                  <option value="" disabled>-- kelas --</option>
                  <option v-for="(data, index) in availableKelas" :value="data" :key="index">{{ data }}</option>
                </select>
              </div>

              <!-- SEMESTER SELECT -->
              <div class="mb-3">
                <label for="semester" class="form-label">Semester</label>
                <select name="Semester" id="semester" class="form-select" v-model="selectedSemester" required>
                  <option value="" disabled>-- semester --</option>
                  <option v-for="sem in availableSemesters" :value="sem.value" :key="sem.value">
                    {{ sem.label }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="Pencapaian" class="form-label">Pencapaian</label>
                <input name="Pencapaian" type="number" class="form-control" id="Pencapaian" required max="30" />
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
        selectedKelas: "",
        selectedSemester: "",
        allSemesters: [
          { value: "ganjil", label: "Ganjil" },
          { value: "genap", label: "Genap" },
        ],
      };
    },
    computed: {
      ...mapState("setuppenilaiantahfidz", ["btn", "kelas", "quran"]),

      // Helper to ensure 'quran' is treated as an array (in case it's a JSON string in Vuex)
      quranDataArray() {
        if (!this.quran) return [];
        return typeof this.quran === "string" ? JSON.parse(this.quran) : this.quran;
      },

      availableKelas() {
        const data = this.quranDataArray;
        if (!this.kelas || !Array.isArray(this.kelas) || data.length === 0) return this.kelas;

        // Only return classes that have less than 2 semesters filled
        return this.kelas.filter((k) => {
          const usedSemesters = data.filter((item) => item.SK && item.SK.includes(`#${k}#`)).map((item) => item.SK.split("#")[2]);

          return usedSemesters.length < 2;
        });
      },

      availableSemesters() {
        const data = this.quranDataArray;
        if (!this.selectedKelas || data.length === 0) return this.allSemesters;

        // Find which semesters are already used for the selected class
        const usedSemesters = data.filter((item) => item.SK && item.SK.includes(`#${this.selectedKelas}#`)).map((item) => item.SK.split("#")[2]);

        // Return only semesters not in the used list
        return this.allSemesters.filter((sem) => !usedSemesters.includes(sem.value));
      },
    },
    watch: {
      // Reset semester if the user changes the class
      selectedKelas() {
        this.selectedSemester = "";
      },
    },
    methods: {
      ...mapActions("setuppenilaiantahfidz", ["submit"]),
    },
  };
</script>
