<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="laundryModalAdd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="dataLaundryAdd" id="formModalAdd">
            <div class="modal-body">
              <div class="mb-3">
                <label for="keranjang" class="form-label">Keranjang</label>
                <input type="number" class="form-control" name="Keranjang" :value="dummy.length + 1">
              </div>
              <div>
                <label for="total" class="form-label">Total</label>
                <input type="number" class="form-control" name="Total" disabled>
                <input type="number" class="form-control" name="Total" hidden>
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/nota', ['dummy']),
    ...mapState('laundry/input', ['btn'])
  },
  methods: {
    ...mapActions('laundry/input', ['dataLaundryAdd']),
  },
}
</script>

<style scoped></style>
