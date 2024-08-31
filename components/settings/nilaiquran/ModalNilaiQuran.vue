<template>
  <div>
    <!-- input modal -->
    <div class="modal fade" id="inputnilaiquran" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="submit" id="inputQuran">
            <div class="modal-header">
              <h1 class="modal-title fs-5">
                Input Nilai Quran
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="kelas" class="form-label">Kelas</label>
                <select name="Kelas" id="kelas" class="form-select">
                  <option value="">-- kelas --</option>
                  <option v-for="(data, index) in kelas" :value="data" :key="index">{{ data }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="semester" class="form-label">Semester</label>
                <select name="Semester" id="semester" class="form-select">
                  <option value="">-- semester --</option>
                  <option value="ganjil">Ganjil</option>
                  <option value="genap">Genap</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  Simpan
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
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('setupnilaiquran', ['btn', 'kelas'])
  },
  methods: {
    ...mapActions('setupnilaiquran', ['submit'])
  },
}
</script>

<style scoped></style>
