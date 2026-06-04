<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Input Nilai Ujian</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>

        <form @submit.prevent="submitNilai">
          <div class="modal-body">
            <div class="mb-3">
              <label for="score" class="form-label">Score</label>
              <input type="number" class="form-control" min="1" max="100" id="score" v-model="formData.Score" required />
            </div>

            <div class="mb-3">
              <label for="status" class="form-label">Status</label>
              <select class="form-select" id="status" v-model="formData.Status" required>
                <option value="" disabled>Pilih Status...</option>
                <option value="lulus">Lulus</option>
                <option value="mengulang">Mengulang</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <textarea class="form-control" id="keterangan" v-model="formData.keterangan" rows="3"></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Batal</button>
            <button type="submit" class="btn text-white" style="background-color: #176b87" :disabled="isLoading">
              {{ isLoading ? "Menyimpan..." : "Simpan Nilai" }}
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
        formData: {
          Score: "",
          Status: "",
          keterangan: "",
        },
      };
    },
    // Inside components/NilaiModal.vue

    watch: {
      studentData: {
        immediate: true,
        handler(newVal) {
          // If there is data for the selected student, map it to the form
          if (newVal) {
            this.formData = {
              Score: newVal.Score || "",
              Status: newVal.Status || "",
              keterangan: newVal.Note || "",
            };
          } else {
            this.formData = { Score: "", Status: "", keterangan: "" };
          }
        },
      },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      async submitNilai() {
        this.isLoading = true;
        try {
          // Pass both form data and the selected student data to the action
          await this.$store.dispatch("tahfidzujian/submitNilaiUjianmodal", {
            formData: this.formData,
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
