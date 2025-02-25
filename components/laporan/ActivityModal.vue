<template>
  <div>
    <!-- input Modal -->
    <div class="modal fade" id="modalAddActivity" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="addActivity" id="formAddActivity">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Activity</h1>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="Name" class="form-label">Nama Pekerjaan</label>
                <input type="text" class="form-control" name="Name" id="Name" required>
              </div>
              <div class="mb-3">
                <label for="gedung" class="form-label">Gedung</label>
                <select name="Gedung" id="gedung" class="form-select" @change="getRuanganActivity()" v-model="selectedGedung" required>
                  <option value="" selected disabled>select Gedung</option>
                  <option v-for="(data, index) in gedungActivity" :key="index" :value="data.SK">{{ data.SK }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="Ruangan" class="form-label">Ruangan</label>
                <select id="Ruangan" class="form-select" v-model="selectedRuang" required>
                  <option value="" selected disabled>select Gedung</option>
                  <option v-for="(data, index) in ruanganActivity" :key="index" :value="data">{{ data.Name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="pic" class="form-label">PIC</label>
                <select name="PIC" id="pic" class="form-select" required>
                  <option value="" selected disabled>select PIC</option>
                  <option v-for="(data, index) in listPegawai" :key="index" :value="data.Nama">{{ data.Nama }}</option>
                </select>
              </div>
              <div class="">
                <label class="form-label">Waktu</label>
                <div class="input-group">
                  <input name="date" type="date" class="form-control" required>
                  <input name="time" type="time" class="form-control" required>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Add</button>
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

    <!-- update Modal -->
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('scan', ['listPegawai', 'btn', 'updateToActivity', 'gedungActivity', 'ruanganActivity']),
    ...mapGetters('scan', ['getSelectedGedung', 'getSelectedRuang']),
    selectedGedung: {
      get() {
        return this.getSelectedGedung
      },
      set(value) {
        this.$store.commit('scan/setState', { key: 'selectedGedung', value })
      }
    },
    selectedRuang: {
      get() {
        return this.getSelectedRuang
      },
      set(value) {
        this.$store.commit('scan/setState', { key: 'selectedRuang', value})
      }
    }
  },
  methods: {
    ...mapActions('scan', ['updateActivity', 'getRuanganActivity', 'addActivity'])
  },
}
</script>

<style scoped>
input {
  font-size: 16px !important;
}
</style>
