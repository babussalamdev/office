<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="laundryFinanceAdd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="addFinance" id="formFinanceAdd">
            <div class="modal-body">
              <!-- <div class="mb-3">
                <label for="transaction" class="form-label">Transaction</label>
                <select name="Transaction" id="transaction" class="form-control" v-model="transaction">
                  <option value="">select Transaction</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div> -->
              <div class="mb-3">
                <label for="transaction" class="form-label">Transaction</label>
                <div class="radio_group">
                  <input type="radio" name="Transaction" id="Debit" value="debit" v-model="transaction">
                  <label for="Debit" class="radio_label" @click="setOptions('debit')">Debet</label>
                  <input type="radio" name="Transaction" id="Credit" value="credit" v-model="transaction">
                  <label for="Credit" class="radio_label" @click="setOptions('credit')">Kredet</label>
                </div>
              </div>
              <div class="mb-3" v-if="transaction === 'credit' || transaction === 'debit'">
                <label for="type" class="form-label">Type</label>
                <!-- <select name="Type" id="type" class="form-control">
                  <option value="">select Type</option>
                  <option value="inventory">Inventory</option>
                  <option value="petty cash">Petty Cash</option>
                  <option value="other">Other</option>
                </select> -->
                <div class="radio_group">
                  <input type="radio" name="Type" id="inventory" value="inventory">
                  <label for="inventory" class="radio_label">Inventory</label>
                  <input type="radio" name="Type" id="petty cash" value="petty cash">
                  <label for="petty cash" class="radio_label">Petty Cash</label>
                  <input type="radio" name="Type" id="other" value="other">
                  <label for="other" class="radio_label">Other</label>
                </div>
              </div>
              <!-- Name -->
              <div class="mb-3" v-if="transaction === 'debit'">
                <label for="name" class="form-label">Nama</label>
                <input type="text" id="name" class="form-control" name="Name">
              </div>
              <div class="mb-3" v-if="transaction === 'credit'">
                <label for="name" class="form-label">Nama</label>
                <select name="Name" id="name" class="form-select text-capitalize" v-model="selectedInventory">
                  <option value="">select Inventory</option>
                  <option v-for="(data, index) in datas.inventory" :key="index" :value="data">{{ data.Name }}
                  </option>
                </select>
              </div>
              <!-- Supplier -->
              <div class="mb-3" v-if="transaction === 'credit'">
                <label for="supplier" class="form-label">Supplier</label>
                <input type="text" class="form-control" name="Supplier" :value="selectedInventory.Supplier" readonly>
              </div>
              <div class="mb-3" v-if="transaction === 'debit'">
                <label for="supplier" class="form-label">Supplier</label>
                <input type="text" id="supplier" class="form-control" name="Supplier">
              </div>
              <!-- Note -->
              <div class="mb-3" v-if="transaction === 'credit' || transaction === 'debit'">
                <label for="note" class="form-label">Note</label>
                <input type="text" id="note" class="form-control" name="Note">
              </div>
              <div class="mb-3" v-if="transaction === 'credit'">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" class="form-control" name="Price">
              </div>
              <div class="mb-3" v-if="transaction === 'debit'">
                <label for="amount" class="form-label">Amount</label>
                <input type="number" id="amount" class="form-control" name="Amount">
              </div>
              <div class="mb-3" v-if="transaction === 'credit'">
                <label for="qty" class="form-label">Kuantiti</label>
                <input type="number" id="qty" class="form-control" name="QTY">
              </div>
              <div v-if="transaction === 'credit'">
                <label for="unit" class="form-label">Unit</label>
                <select name="Unit" id="unit" class="form-control">
                  <option value="">select unit</option>
                  <option value="Pcs">Pcs</option>
                  <option value="Pax">Pax</option>
                  <option value="Kg">Kg</option>
                  <option value="Liter">Liter</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="resetTransaction()">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Save</button>
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/finance', ['datas', 'transaction', 'btn']),
    ...mapGetters('laundry/finance', ['getTransaction', 'getSelectedInventory']),
    transaction: {
      get() {
        return this.getTransaction
      },
      set(value) {
        this.$store.commit('laundry/finance/setState', { key: 'transaction', value })
      }
    },
    selectedInventory: {
      get() {
        return this.getSelectedInventory
      },
      set(value) {
        this.$store.commit('laundry/finance/setState', { key: 'selectedInventory', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/finance', ['addFinance']),
    ...mapMutations('laundry/finance', ['resetTransaction']),
    setOptions(data) {
      this.option = data
    },
  },
}
</script>

<style scoped>
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
