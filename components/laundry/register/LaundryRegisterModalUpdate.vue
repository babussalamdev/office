<template>
  <div>
    <div class="modal fade" id="laundryRegisterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateDataRegister" id="formRegisterUpdate">
            <div class="modal-body">
              {{ updateData }} <br>
              <label class="form-label mb-2">Sebab Nonaktif</label>
              <select name="Status" class="form-select">
                <option value="">choose a cause</option>
                <option value="lost">Hilang</option>
                <option value="damaged">Rusak</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetUpdateData">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">NonAktifkan</button>
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
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/register', ['updateData', 'btn'])
  },
  methods: {
    ...mapActions('laundry/register', ['updateDataRegister']),
    ...mapMutations('laundry/register', ['resetUpdateData'])
  },
}
</script>

<style scoped></style>
