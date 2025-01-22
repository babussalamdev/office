<template>
  <div>
    <div class="modal fade" id="note" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputLaporan" id="noteForm">
            <div class="modal-header">
              <h1 class="modal-title fs-5">{{ split(decodedText) }}</h1>
            </div>
            <div class="modal-body">
              <div class="">
                <div class="form-floating">
                  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" name="laporan"></textarea>
                  <label for="floatingTextarea2">Laporan</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">batal</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Kirim Laporan</button>
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
      ...mapState('scan', ['decodedText', 'btn'])
    },
    methods: {
      ...mapActions('scan', { inputLaporan: 'inputLaporan'}),
      split(text) {
        return text.split('#')[2]
      }
    },
  }
</script>

<style scoped>

</style>
