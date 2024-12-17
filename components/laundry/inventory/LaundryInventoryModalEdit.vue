<template>
  <div>
    <div class="modal fade" id="laundryInventoryModalEdit" data-bs-backdrop="static" data-bs-keyboard="false"
      tabindex="-1" aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="editItem" id="formInventoryModalEdit">
            <div class="modal-body">
              <div class="mb-3">
                <p class="mb-2">Items</p>
                <div class="radio_group">
                  <input type="radio" name="Name" id="Detergent" value="detergent" v-model="option">
                  <label for="Detergent" class="radio_label" @click="setOptions('detergent')">Detergent</label>
                  <input type="radio" name="Name" id="Parfum" value="parfum" v-model="option">
                  <label for="Parfum" class="radio_label" @click="setOptions('parfum')">Parfum</label>
                  <input type="radio" name="Name" id="Gas" value="gas" v-model="option">
                  <label for="Gas" class="radio_label" @click="setOptions('gas')">Gas</label>
                </div>
              </div>
              <div class="mb-3">
                <label for="supplier" class="form-label">Supplier</label>
                <select name="Supplier" id="supplier" class="form-select" v-model="updateData.Supplier">
                  <option value="">Select Supplier</option>
                  <option v-for="(data, index) in supplier" :key="index" :value="data">{{ data }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="kuantitas" class="form-label">Kuantitas</label>
                <input type="number" id="kuantitas" class="form-control" name="QTY" :value="updateData.QTY">
              </div>
              <div>
                <label for="harga" class="form-label">Harga</label>
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input type="number" id="harga" class="form-control" name="Amount" :value="updateData.Amount">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="resetUpdateData">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Simpan</button>
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
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/inventory', ['btn', 'updateData', 'supplier']),
    ...mapGetters('laundry/inventory', ['getOptions']),
    option: {
      get() {
        return this.getOptions
      },
      set(value) {
        this.$store.commit('laundry/inventory/setOptions', value)
      }
    }
  },
  methods: {
    ...mapActions('laundry/inventory', ['editItem']),
    ...mapMutations('laundry/inventory', ['resetUpdateData']),
    setOptions(data) {
      this.option = data
    },
  },
}
</script>

<style>
.radio_group {
  display: flex;
  gap: 5px;
}

.radio_group label {
  flex-grow: 1;
  box-sizing: border-box;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
}

.radio_group input:checked+.radio_label {
  background: blue;
  color: white;
  border-color: blue;
}

.radio_group input {
  display: none;
}
</style>
