<template>
  <div>
    <!-- update database pegawai  -->
    <div class="modal fade" id="updateDataSantriHalaqah" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateDataSantriHalaqah" ref="updateDataSantriHalaqah">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Bulk Update Halaqah
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="Kelas" class="form-label">Halaqah</label>
                <select name="value" id="Kelas" class="form-select" v-model="asramaShow" required>
                  <option value="" selected disabled>
                    -- Pilih Halaqah --
                  </option>
                  <option v-for="(value, index) in selectHalaqah" :value="value" :key="index">
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
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("santri/halaqah", ["selectHalaqah", 'updateData', 'btn']),
    ...mapGetters('santri/halaqah', ['getAsramaShow']),
    asramaShow: {
      get() {
        return this.getAsramaShow
      },
      set(value) {
        this.$store.commit('santri/halaqah/setAsramaShow', value)
      }
    }
  },
  methods: {
    ...mapActions('santri/halaqah', ['updateDataSantriHalaqah']),
  },
};
</script>

<style lang="scss" scoped></style>
