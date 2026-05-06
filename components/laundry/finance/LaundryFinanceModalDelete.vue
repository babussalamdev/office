<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="laundryHistoryDelete"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <!-- Name -->
            <div class="mb-3">
              <label for="viewName" class="form-label">Nama</label>
              <input type="text" id="viewName" class="form-control" :value="updateData.Name" disabled />
            </div>

            <!-- Destination Bank -->
            <div class="mb-3">
              <label for="viewBankName" class="form-label">Destination Bank</label>
              <input type="text" id="viewBankName" class="form-control" :value="updateData.BankName" disabled />
            </div>

            <!-- Destination Bank Account Number -->
            <div class="mb-3">
              <label for="viewBankAccountNumber" class="form-label">Destination Bank Account Number</label>
              <input type="text" id="viewBankAccountNumber" class="form-control" :value="updateData.BankAccountNumber" disabled />
            </div>

            <!-- Destination Bank Account Name -->
            <div class="mb-3">
              <label for="viewBankAccountName" class="form-label">Account Holder Name</label>
              <input type="text" id="viewBankAccountName" class="form-control" :value="updateData.BankAccountName" disabled />
            </div>

            <!-- Amount -->
            <div class="mb-3">
              <label for="viewAmount" class="form-label">Amount</label>
              <!-- You can wrap this value in your rupiah() formatter if you want it to look like currency! -->
              <input type="text" id="viewAmount" class="form-control" :value="updateData.Amount" disabled />
            </div>

            <!-- Notes / Remarks -->
            <div class="mb-3">
              <label for="viewNote" class="form-label">Notes</label>
              <textarea id="viewNote" class="form-control" :value="updateData.Note" rows="2" disabled></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetUpdateData()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapState("laundry/finance", ["updateData"]),
    },
    methods: {
      ...mapMutations("laundry/finance", ["resetUpdateData"]),
    },
  };
</script>

<style scoped></style>
