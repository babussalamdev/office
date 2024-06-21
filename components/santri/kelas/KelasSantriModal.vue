<template>
  <div>
    <!-- update database pegawai  -->
    <div class="modal fade" id="updateDataSantriKelas" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateDataSantriKelas" ref="updateDataSantriKelas">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Bulk Update kelas
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="Kelas" class="form-label">Kelas</label>
                <select name="value" id="Kelas" class="form-select" v-model="kelasShow" required>
                  <option value="" selected disabled>-- Pilih Kelas --</option>
                  <option v-for="(value, index) in select" :value="value" :key="index">
                    {{ value }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  simpan
                </button>
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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("santri/kelas", ["select", 'updateData', 'btn']),
    ...mapGetters('santri/kelas', ['getKelasShow']),
    kelasShow: {
      get() {
        return this.getKelasShow
      },
      set(value) {
        this.$store.commit('santri/kelas/setKelasShow', value)
      }
    }
  },
  methods: {
    ...mapActions('santri/kelas', ['updateDataSantriKelas']),
  },
};
</script>

<style lang="scss" scoped></style>
