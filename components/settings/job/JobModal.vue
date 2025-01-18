<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="jobModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputData" id="jobForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="job" class="form-label">Pekerjaan</label>
                <input type="text" class="form-control" id="job" name="SK">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Simpan</button>
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
  data() {
    return {
      // Array yang menyimpan data input teks
      inputs: ['']
    };
  },
  computed: {
    ...mapState('job', ['btn', 'pegawai', 'ruangan', 'job']),
    ...mapGetters('job', ['getInputs'])
  },
  watch: {
    // job() {
    //   this.inputs = ['']
    // }
  },
  methods: {
    ...mapActions('job', ['inputData']),
    // tambahData(event) {
    //   this.inputData({ event, input: this.inputs})
    // },
    addInput() {
      if (this.inputs.length < 5 && this.inputs[0]) {
        this.inputs.push('');
      }
    },
    // Menghapus input berdasarkan index
    removeInput(index) {
      if (this.inputs.length > 1) {
        this.inputs.splice(index, 1);
      }
    }
  },
}
</script>

<style scoped>

</style>
