<template>
  <div>
    <!-- input modal -->
    <div class="modal fade" id="inputmatan" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Changed to call submitForm instead of direct Vuex submit -->
          <form @submit.prevent="submitForm" id="inputMatan">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Input Matan</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- KELAS SELECT -->
              <div class="mb-3">
                <label for="kelas" class="form-label">Kelas</label>
                <select name="Kelas" id="kelas" class="form-select" v-model="selectedKelas" required>
                  <option value="" disabled>-- kelas --</option>
                  <option v-for="(data, index) in kelas" :value="data" :key="index">{{ data }}</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="Nama" class="form-label">Nama Matan</label>
                <input name="Nama" type="text" class="form-control" id="Nama" required />
              </div>

              <div class="mb-3">
                <label for="Pencapaian" class="form-label">Pencapaian</label>
                <input name="Pencapaian" type="number" class="form-control" id="Pencapaian" required />
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
    // Added props so the parent component can pass the currently selected Tahun & Semester
    props: ["selectedTahun"],
    data() {
      return {
        selectedKelas: "",
      };
    },
    computed: {
      ...mapState("matan", ["btn", "kelas", "matan"]),

      // Helper to ensure 'quran' is treated as an array (in case it's a JSON string in Vuex)
      matanDataArray() {
        if (!this.matan) return [];
        return typeof this.matan === "string" ? JSON.parse(this.matan) : this.matan;
      },
    },
    methods: {
      ...mapActions("matan", ["submit"]),

      // Wrapper method to package the form data alongside the passed props
      submitForm(event) {
        this.submit({
          event: event,
          tahun: this.selectedTahun,
        });
      },
    },
  };
</script>
