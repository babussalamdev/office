<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalIzin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="izinUpdate" id="santriIzinUpdate">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-capitalize" id="staticBackdropLabel">
                Update Izin - {{ updateDataIzin.Nama }}
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <textarea name="Note" class="form-control" style="height: 100px" placeholder="Leave a comment here"
                  id="floatingTextarea" :value="updateDataIzin?.Note"></textarea>
                <label for="floatingTextarea">Catatan</label>
              </div>
              <div class="mb-3">
                <label for="tanggal" class="mb-2">Tanggal</label>
                <input id="tanggal" class="form-control" :value="updateDataIzin?.Date" name="Date" type="date" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  Update
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
    ...mapState('asramaAbsensi', ['updateDataIzin', 'btn']),
  },
  methods: {
    ...mapActions('asramaAbsensi', ['izinUpdate'])
  },
};
</script>

<style lang="scss" scoped></style>
