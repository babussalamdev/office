<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="laundryFinanceAdd"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="addFinance" id="formFinanceAdd">
            <div class="modal-body">
              <!-- Transaksi & Type (Hidden per rules) -->
              <input type="hidden" name="Subject" value="kwitansi" />

              <!-- Name (Strictly tied to today's claim date string) -->
              <div class="mb-3">
                <label for="name" class="form-label">Nama</label>
                <input type="text" id="name" class="form-control" name="Name" v-model="claimName" />
              </div>

              <!-- Bank Selection Dropdown -->
              <div class="mb-3">
                <label for="bankName" class="form-label">Destination Bank</label>
                <select id="bankName" class="form-select" name="BankName" v-model="bankName" required>
                  <option value="" disabled>Select Bank</option>
                  <option value="BSI">BSI</option>
                  <option value="CIMB Niaga">CIMB Niaga</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Destination Bank Account Number (Validated) -->
              <div class="mb-3">
                <label for="bankAccountNumber" class="form-label">Destination Bank Account Number</label>
                <input
                  type="text"
                  id="bankAccountNumber"
                  class="form-control"
                  name="BankAccountNumber"
                  v-model="bankAccountNumber"
                  @input="validateAccountNumber"
                  placeholder="e.g., 1234567890"
                  required />
                <div class="form-text" style="font-size: 11px">Numbers only.</div>
              </div>

              <!-- Destination Bank Account Name -->
              <div class="mb-3">
                <label for="bankAccountName" class="form-label">Account Holder Name</label>
                <input type="text" id="bankAccountName" class="form-control" name="BankAccountName" v-model="bankAccountName" required />
              </div>

              <!-- Amount (Disabled, mapped from state) -->
              <div class="mb-3">
                <label for="amount" class="form-label">Amount</label>
                <input type="number" id="amount" class="form-control" name="Amount" :value="claimAmount" disabled />
              </div>

              <!-- Notes / Remarks -->
              <div class="mb-3">
                <label for="note" class="form-label">Notes</label>
                <textarea id="note" class="form-control" name="Note" v-model="note" rows="2" placeholder="Optional remarks..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
  import { mapState, mapActions } from "vuex";

  export default {
    data() {
      return {
        claimName: "",
        bankName: "",
        bankAccountNumber: "",
        bankAccountName: "",
        note: "",
      };
    },
    computed: {
      ...mapState("laundry/finance", ["datas", "btn"]),

      claimAmount() {
        return this.datas?.total_denda || 0;
      },
    },
    mounted() {
      this.generateDefaultName();
    },
    methods: {
      ...mapActions("laundry/finance", ["addFinance"]),

      generateDefaultName() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");

        this.claimName = `pencairan dana laundry ${yyyy}-${mm}-${dd}`;
      },

      validateAccountNumber(event) {
        // Regex strips out all non-digit characters in real-time
        this.bankAccountNumber = event.target.value.replace(/\D/g, "");
      },
    },
  };
</script>

<style scoped></style>
