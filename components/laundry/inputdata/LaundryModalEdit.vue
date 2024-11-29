<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="laundryModalEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="dataLaundryEdit">
            <div class="modal-body">
              <div class="mb-3">
                <label for="santri" class="form-label">Nama Santri</label>
                <input type="text" id="santri" class="form-control" name="Santri" disabled :value="updateData.Nama">
                <input type="text" id="santri" class="form-control" name="Santri" hidden :value="updateData.Nama">
              </div>
              <div>
                <label for="jumlahlaundry" class="form-label">Jumlah Laundry</label>
                <input type="number" id="jumlahlaundry" class="form-control" name="CountLaundry"
                  :value="updateData.Jumlah">
              </div>
            </div>
            <div class="modal-footer">
              <button @click="resetEditData" type="button" class="btn btn-secondary"
                data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Update</button>
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
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/input', ['updateData', 'btn'])
  },
  methods: {
    ...mapActions('laundry/input', ['dataLaundryEdit']),
    ...mapMutations('laundry/input', ['resetEditData']),
  },
}
</script>

<style scoped></style>
