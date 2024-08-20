<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="inputModalJurnal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="submit" id="modalInput">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Jurnal</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Leave a comment here" id="judul" style="height: 100px"
                  name="Description"></textarea>
                <label for="judul">Judul Pembahasan</label>
              </div>
              <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Leave a comment here" id="catatan" style="height: 100px"
                  name="Occurrence"></textarea>
                <label for="catatan">Catatan Kejadian</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Save</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
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
    ...mapState('jurnal', ['btn'])
  },
  methods: {
    ...mapActions('jurnal', ['submit'])
  },
}
</script>

<style scoped></style>
