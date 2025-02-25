<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="kebersihanModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="failedItem" id="kebersihanForm">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed</h1>
            </div>
            <div class="modal-body">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" name="Catatan"></textarea>
                <label for="floatingTextarea2">Catatan</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-danger">failed</button>
                <button v-else class="btn btn-danger" type="button" disabled>
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
    ...mapState('kebersihan', ['btn', 'updateData'])
  },
  methods: {
    ...mapActions('kebersihan', ['failedItem'])
  },
}
</script>

<style scoped>

</style>
