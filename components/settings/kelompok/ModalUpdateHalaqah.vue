<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="updateHalaqahModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateHalaqah" id="formUpdate">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Halaqah</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Urutan</label>
                <input name="Sort" type="number" class="form-control" id="sort" required :value="updateData.Sort" />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Halaqoh</label>
                <input name="Nama" type="text" class="form-control" id="nama" required :value="updateData.Nama" />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Kelas</label>
                <select name="Kelas" class="form-select" :value="updateData.Kelas">
                  <option value="">-- select kelas --</option>
                  <option v-for="(data, index) in selectKelas" :key="index" :value="data">{{ data }}</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Submit</button>
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
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('kelompok', ['updateData', 'selectKelas', 'btn'])
  },
  methods: {
    ...mapActions('kelompok', ['updateHalaqah'])
  },
}
</script>

<style scoped></style>
