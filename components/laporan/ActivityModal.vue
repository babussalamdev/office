<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalUpdateActivity" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateActivity" id="formUpdateActivity">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Activity</h1>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="pic" class="form-label">PIC</label>
                <select name="PIC" id="pic" class="form-select" :value="updateToActivity?.PIC" required>
                  <option value="" selected disabled>select PIC</option>
                  <option v-for="(data, index) in listPegawai" :key="index" :value="data.Nama">{{ data.Nama }}</option>
                </select>
              </div>
              <div class="">
                <label class="form-label">Waktu</label>
                <div class="input-group">
                  <input name="date" type="date" class="form-control" :value="updateToActivity?.Timestamp?.menunggu.split(' ')[0]" required>
                  <input name="time" type="time" class="form-control" :value="updateToActivity?.Timestamp?.menunggu.split(' ')[1]" required>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Input</button>
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
    ...mapState('scan', ['listPegawai', 'btn', 'updateToActivity'])
  },
  methods: {
    ...mapActions('scan', ['updateActivity'])
  },
}
</script>

<style scoped>
input {
  font-size: 16px !important;
}
</style>
