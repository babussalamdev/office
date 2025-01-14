<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="ruanganModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputData">
            <div class="modal-body">
              <div class="">
                <label for="nama" class="form-label">Nama Ruangan</label>
                <input type="text" id="nama" name="Name" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
              <button v-if="btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('ruangan', ['btn'])
  },
  methods: {
    ...mapActions('ruangan', ['inputData'])
  },
}
</script>

<style scoped>

</style>
