<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="jobModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="ubahData" id="jobFormUpdate">
            <div class="modal-body">
              <div>
                <label class="form-label">Pekerjaan</label>
                <div v-for="(input, index) in inputs" :key="index" class="input-group mb-2">
                  <input v-model="inputs[index]" type="text" placeholder="Enter text" class="form-control"/>
                  <button type="button" class="btn btn-sm btn-danger input-group-text" @click="removeInput(index)" v-if="inputs.length > 1">Remove</button>
                </div>

                <button type="button" class="btn btn-sm btn-success" @click="addInput" v-if="inputs.length < 5 && inputs[0]">Add Input</button>
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
    ...mapState('job', ['btn', 'pegawai', 'ruangan', 'updateData']),
    ...mapGetters('job', ['getInputs'])
  },
  watch: {
    updateData(data) {
      this.inputs = data.Name.split(',')
    },
    job() {
      this.inputs = ['']
    }
  },
  methods: {
    ...mapActions('job', ['updateItem']),
    ubahData() {
      this.updateItem({ input: this.inputs})
    },
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
