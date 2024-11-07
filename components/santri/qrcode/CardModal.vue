<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="cardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputCard" id="formInput">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Kartu</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="jumlah" class="form-label">Jumlah Kartu</label>
                <input type="number" class="form-control" name="Number" id="jumlah">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Tambah</button>
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
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('qrcode', ['btn'])
  },
  methods: {
    ...mapActions('qrcode', ['inputCard'])
  },
}
</script>

<style scoped></style>
