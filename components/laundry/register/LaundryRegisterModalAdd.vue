<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalAddDataBag" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="addDataTag">
            <div class="modal-body">
              <div class="mb-3">
                <label for="nfc" class="form-label">NFC Tag</label>
                <input type="text" id="nfc" class="form-control" name="SK" required>
              </div>
              <div class="mb-3">
                <label for="asrama" class="form-label">Asrama</label>
                <select id="asrama" class="form-select" required v-model="selectedAsramaModal">
                  <option value="">select asrama</option>
                  <option v-for="(data, index) in listAsrama" :key="index" :value="data.Nama">{{ data.Nama }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="santri" class="form-label">Santri</label>
                <select id="santri" class="form-select" required v-model="selectedDataModal">
                  <option value="">select santri</option>
                  <option v-for="(data, index) in datasModal" :key="index" :value="data">{{ data.Name }}</option>
                </select>
              </div>
              <div class="">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" class="form-control" :value="selectedDataModal ? selectedDataModal.SK : ''" required>
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/register', ['listAsrama', 'datasModal', 'btn']),
    ...mapGetters('laundry/register', ['getSelectedAsramaModal', 'getSelectedDataModal']),
    selectedAsramaModal: {
      get() {
        return this.getSelectedAsramaModal
      },
      set(value) {
        this.$store.commit('laundry/register/setState', { key: 'selectedAsramaModal', value })
      }
    },
    selectedDataModal: {
      get() {
        return this.getSelectedDataModal
      },
      set(value) {
        this.$store.commit('laundry/register/setState', { key: 'selectedDataModal', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/register', ['addDataTag'])
  },
  watch: {
    selectedAsramaModal(data) {
      this.$store.dispatch('laundry/register/getModal')
    }
  },
}
</script>

<style scoped></style>
