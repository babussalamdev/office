<template>
  <div>
    <div>
      <!-- update database pegawai  -->
      <div class="modal fade" id="mapelSetupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <form @submit.prevent="updateMapelSetup" id="updateMapel">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Update Mapel Setup
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="kelas" class="form-label">Halaqah</label>
                  <select name="Asrama" id="Asrama" class="form-select" v-model="pengajarShow" required>
                    <option value="" selected disabled>
                      -- Pilih Pengajar --
                    </option>
                    <option v-for="(value, index) in pengajar" :value="value" :key="index">
                      {{ value.Nama }}
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
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      unit: localStorage.getItem("program"),
    };
  },
  computed: {
    ...mapState("pegawai/mapel", ["pengajar", 'btn', 'updateData']),
    ...mapGetters('pegawai/mapel', ['getPengajarShow']),
    pengajarShow: {
      get() {
        return this.getPengajarShow
      },
      set(value) {
        const obj = { key: 'pengajarShow', value }
        this.$store.commit('pegawai/mapel/setState', obj)
      }
    }
  },
  methods: {
    ...mapActions('pegawai/mapel', ['updateMapelSetup'])
  },
  // watch: {
  //   updateData: {
  //     handler(data) {
  //       this.halaqahShow = data.Halaqah[this.unit];
  //     },
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
