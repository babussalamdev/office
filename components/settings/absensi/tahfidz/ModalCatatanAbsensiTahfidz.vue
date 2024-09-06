<template>
  <div>
    <!-- pagi -->
    <div class="modal fade" id="modalcatatanpagi" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updatecatatanpagi" id="formpagi">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Catatan Pagi</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating">
                <textarea style="height: 100px;" class="form-control" placeholder="Leave a comment here"
                  id="floatingTextarea" name="Catatan"></textarea>
                <label for="floatingTextarea">Catatan</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Simpan</button>
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

    <!-- sore -->
    <div class="modal fade" id="modalcatatansore" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updatecatatansore" id="formsore">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Catatan Sore</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating">
                <textarea style="height: 100px;" class="form-control" placeholder="Leave a comment here"
                  id="floatingTextarea" name="Catatan"></textarea>
                <label for="floatingTextarea">Catatan</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Simpan</button>
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
    ...mapState('tahfidzAbsensi', ['btn'])
  },
  methods: {
    ...mapActions('tahfidzAbsensi', ['updatecatatanpagi', 'updatecatatansore'])
  },
}
</script>

<style scoped></style>
