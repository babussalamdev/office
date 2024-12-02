<template>
  <div>
    <div class="modal fade" id="laundryChannelEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="editData" id="formLaundryChannelEdit">
            <div class="modal-body">
              <div class="mb-3">
                <label for="name" class="form-label">Nama</label>
                <input type="text" id="name" name="Name" class="form-control" :value="updateData.Name">
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Kategori</label>
                <input type="text" id="category" name="Category" class="form-control" :value="updateData.Category">
              </div>
              <div class="mb-3">
                <label for="contact" class="form-label">Kontak</label>
                <input type="text" id="contact" name="Contact" class="form-control" :value="updateData.Contact">
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Alamat</label>
                <input type="text" id="address" name="Address" class="form-control" :value="updateData.Address">
              </div>
              <div>
                <label for="note" class="form-label">Catatan</label>
                <textarea class="form-control" placeholder="Leave a comment here" id="note"
                  style="height: 100px" name="Note" :value="updateData.Note"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
    ...mapState('laundry/channel', ['btn', 'updateData']),
    ...mapGetters('laundry/channel', ['getType']),
    type: {
      get() {
        return this.getType
      },
      set(value) {
        this.$store.commit('laundry/channel/setState', { key: 'type', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/channel', ['editData'])
  },
}
</script>

<style></style>
