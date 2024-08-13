<template>
  <div>
    <!-- update pelanggaran  -->
    <div class="modal fade" id="updateModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateForm" id="updateForm">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Data Pelanggaran
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 input-group">
                <select name="Level" id="Kelas" class="form-select" :value="updateRecord.Level" required>
                  <option value="" selected disabled>Level</option>
                  <option value="kecil">Kecil</option>
                  <option value="sedang">Sedang</option>
                  <option value="besar">Besar</option>
                </select>
                <input type="number" class="form-control" placeholder="Poin" name="Poin" :value="updateRecord.Poin" />
              </div>
              <div class="form-floating mb-3">
                <textarea :value="updateRecord.Nama" name="Nama" class="form-control" placeholder="Leave a comment here"
                  id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Jenis Pelanggaran</label>
              </div>
              <div class="form-floating mb-3">
                <textarea :value="updateRecord.Solusi" name="Solusi" class="form-control"
                  placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Tindak Lanjut</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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
    ...mapState("pelanggaran", ["updateData", 'updateRecord', 'btn']),
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions('pelanggaran', { changeAction: 'updateForm' }),
    updateForm(event) {
      const obj = { id: this.id, event }
      this.changeAction(obj)
    },
  },
};
</script>

<style lang="scss" scoped></style>
