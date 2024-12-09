<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="laundryNotaModalAdd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="dataNotaLaundryAdd" id="formNotaModalAdd">
            <div class="modal-body">
              <div class="mb-3">
                <label for="keranjang" class="form-label">Keranjang</label>
                <input type="number" class="form-control" name="Keranjang" :value="amountCart" readonly>
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
    ...mapState('laundry/nota', ['datas', 'btn']),
    amountCart() {
      if (this.datas.length > 0) {
        let lastChart = this.datas[this.datas.length - 1].Chart;
        let nextNumber = parseInt(lastChart) + 1;
        let nextChart = nextNumber.toString().padStart(3, '0');
        return nextChart;
      } else {
        return '001'
      }
    }
  },
  methods: {
    ...mapActions('laundry/nota', ['dataNotaLaundryAdd']),
  },
}
</script>

<style scoped></style>
