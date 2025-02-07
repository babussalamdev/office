<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalSarpras" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateJabatan" id="formUpdateSarpras">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Jabatan Sarpras</h1>
            </div>
            <div class="modal-body">
              <div>
                <label for="jabatan" class="form-label">Jabatan</label>
                <select name="Value" id="jabatan" class="form-select" :value="updateData?.Jabatan" required>
                  <option value="" selected disabled>Jabatan</option>
                  <option value="koordinator">Koordinator</option>
                  <option value="kebersihan">Kebersihan</option>
                  <option value="maintenance">Maintenance</option>
                </select>
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
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('sarpras', ['updateData', 'btn']),
    ...mapState('index', ['unit'])
  },
  methods: {
    ...mapActions('sarpras', ['updateJabatan'])
  },
}
</script>

<style scoped>

</style>
