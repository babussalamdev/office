<template>
  <div class="modal fade show" tabindex="-1" style="display: block; background: rgba(0, 0, 0, 0.5)" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Pilih Penguji (Bulk Update)</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Total Santri Terpilih:</label>
            <p class="fw-bold">{{ students.length }} Santri</p>
          </div>

          <div class="mb-3">
            <label class="form-label">Pilih Penguji Baru</label>
            <select class="form-select" v-model="selectedPenguji" :disabled="isLoading">
              <option value="" disabled>-- Pilih Penguji --</option>
              <option v-for="(penguji, index) in listPenguji" :key="index" :value="penguji">
                {{ penguji.Nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal" :disabled="isLoading">Batal</button>
          <button
            type="button"
            class="btn text-white"
            style="background-color: #176b87"
            @click="submitUpdate"
            :disabled="!selectedPenguji || isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      students: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        selectedPenguji: "",
        isLoading: false,
      };
    },
    computed: {
      ...mapState("ujiantahfidzsettings", ["listPenguji"]),
    },
    mounted() {
      // Fetch the penguji list automatically when modal opens
      if (!this.listPenguji || this.listPenguji.length === 0) {
        this.$store.dispatch("ujiantahfidzsettings/fetchListPenguji");
      }
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      async submitUpdate() {
        if (!this.selectedPenguji || this.students.length === 0) return;

        this.isLoading = true;
        try {
          await this.$store.dispatch("ujiantahfidzsettings/bulkUpdatePenguji", {
            penguji: this.selectedPenguji,
            students: this.students,
          });

          // Refresh table data and close modal
          this.$emit("refresh");
          this.closeModal();
        } catch (error) {
          console.error("Bulk update failed:", error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
</script>
