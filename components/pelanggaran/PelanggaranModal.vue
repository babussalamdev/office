<template>
  <div>
    <!-- input pelanggaran  -->
    <div class="modal fade" id="inputModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputForm" id="inputForm">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Data Pelanggaran
              </h1>
              <button @click="resetForm" type="button" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 input-group">
                <select name="Level" id="Kelas" class="form-select" required>
                  <option value="" selected disabled>Level</option>
                  <option value="kecil">Kecil</option>
                  <option value="sedang">Sedang</option>
                  <option value="besar">Besar</option>
                </select>
                <input type="number" class="form-control" placeholder="Poin" name="Poin" required />
              </div>
              <div class="form-floating mb-3">
                <textarea name="Nama" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                  style="height: 100px" required></textarea>
                <label for="floatingTextarea2">Jenis Pelanggaran</label>
              </div>
              <div class="form-floating mb-3">
                <textarea name="Solusi" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                  style="height: 100px" required></textarea>
                <label for="floatingTextarea2">Tindak Lanjut</label>
              </div>
              <div class="input-group">
                <input type="date" class="form-control" name="Date" required/>
                <input type="time" class="form-control" name="Time" required/>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="resetForm" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  simpan
                </button>
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
  computed: {
    ...mapState("pelanggaran", ["updateData", 'btn']),
  },
  methods: {
    ...mapActions('pelanggaran', ['inputForm']),
    resetForm() {
      $("#inputForm")[0].reset()
    },
  },
};
</script>

<style lang="scss" scoped></style>
