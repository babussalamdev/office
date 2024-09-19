<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalAbsen" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="santriAbsen" id="santriAbsenInput">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-capitalize" id="staticBackdropLabel">
                {{ updateData.type }} - {{ updateData.santri?.Nama }}
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <textarea name="Note" class="form-control" style="height: 100px" placeholder="Leave a comment here"
                  id="floatingTextarea"></textarea>
                <label for="floatingTextarea">Catatan</label>
              </div>
              <div v-if="updateData.type === 'izin'" class="mb-3">
                <label for="tanggal" class="mb-2">Tanggal</label>
                <input id="tanggal" class="form-control" v-model="dateIzin" type="date" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn" :class="updateData.type === 'sekolah'
                  ? 'btn-success'
                  : updateData.type === 'rumah'
                    ? 'btn-secondary'
                    : updateData.type === 'sakit'
                      ? 'btn-warning'
                      : updateData.type === 'izin'
                        ? 'btn-primary'
                        : 'btn-info'
                  ">
                  {{ updateData.type }}
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
import Swal from "sweetalert2";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('asramaAbsensi', ['updateData', 'btn']),
    ...mapGetters('asramaAbsensi', ['getDateIzin']),
    dateIzin: {
      get() {
        return this.getDateIzin
      },
      set(value) {
        this.$store.commit('asramaAbsensi/setState', { key: 'dateIzin', value })
      }
    }
  },
  methods: {
    ...mapActions('asramaAbsensi', ['santriAbsen'])
  },
};
</script>

<style lang="scss" scoped></style>
