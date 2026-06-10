<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ubah Penguji</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>

        <form @submit.prevent="submitPenguji">
          <div class="modal-body">
            <div class="mb-3">
              <label for="penguji" class="form-label">Pilih Penguji</label>
              <select class="form-select" id="penguji" v-model="selectedPenguji" :disabled="isFetchingPenguji" required>
                <option value="" disabled>
                  {{ isFetchingPenguji ? "Memuat data penguji..." : "Pilih Penguji..." }}
                </option>
                <option v-for="(p, index) in listPenguji" :key="index" :value="p">
                  {{ p.Nama }}
                </option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Batal</button>
            <button type="submit" class="btn text-white" style="background-color: #176b87" :disabled="isLoading || isFetchingPenguji">
              {{ isLoading ? "Menyimpan..." : "Simpan Penguji" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: { type: Boolean, required: true },
      studentData: { type: Object, default: () => ({}) },
    },
    data() {
      return {
        isLoading: false,
        isFetchingPenguji: false,
        selectedPenguji: "",
      };
    },
    computed: {
      // Map the list of penguji from Vuex state
      listPenguji() {
        return this.$store.state.ujiantahfidzsettings.listPenguji || [];
      },
    },
    watch: {
      show: {
        immediate: true,
        async handler(newVal) {
          if (newVal) {
            this.selectedPenguji = ""; // Reset selection on open

            // Fetch list of penguji only if the list is empty
            if (this.listPenguji.length === 0) {
              this.isFetchingPenguji = true;
              await this.$store.dispatch("ujiantahfidzsettings/fetchListPenguji");
              this.isFetchingPenguji = false;
            }
          }
        },
      },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      async submitPenguji() {
        this.isLoading = true;
        try {
          // Pass both the selected penguji object and the selected student data to the action
          await this.$store.dispatch("ujiantahfidzsettings/updatePengujiModal", {
            penguji: this.selectedPenguji,
            student: this.studentData,
          });

          this.closeModal();
          this.$emit("refresh"); // Tell parent to refresh the table
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
</script>
