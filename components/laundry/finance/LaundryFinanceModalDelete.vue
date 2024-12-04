<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="laundryHistoryDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="mb-3">
              <label for="type" class="form-label">Type</label>
              <input type="text" id="type" class="form-control" :value="updateData.Type" disabled>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <textarea id="name" class="form-control" :value="updateData.Name" disabled></textarea>
            </div>
            <div class="mb-3">
              <label for="supplier" class="form-label">Supplier</label>
              <input type="text" id="supplier" class="form-control" :value="updateData.Supplier" disabled>
            </div>
            <div>
              <label for="amount" class="form-label">Amount</label>
              <input type="number" id="amount" class="form-control" :value="updateData.Amount" disabled>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteItem()">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetUpdateData()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/finance', ['updateData'])
  },
  methods: {
    ...mapActions('laundry/finance', ['deleteItem']),
    ...mapMutations('laundry/finance', ['resetUpdateData']),
  },
}
</script>

<style scoped></style>
