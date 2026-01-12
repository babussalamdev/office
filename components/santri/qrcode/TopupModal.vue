<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="topupModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputTopupLimit" id="formInputTopup">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Balance Limit</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="jumlah" class="form-label">Balance Limit Amount</label>
                <input type="number" class="form-control" name="Amount" id="Amount" :value="topuplimit?.Amount || 0" />
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
  import { mapActions, mapState } from "vuex";
  export default {
    computed: {
      ...mapState("qrcode", ["btn", "topuplimit"]),
    },
    methods: {
      ...mapActions("qrcode", ["inputTopupLimit"]),
    },
  };
</script>

<style scoped></style>
