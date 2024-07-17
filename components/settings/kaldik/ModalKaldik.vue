<template>
  <div>
    <!-- modal input -->
    <div class="modal fade text-capitalize" id="inputKaldik" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputKaldik" id="inputDataKaldik">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                kegiatan baru
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="kegiatan" class="form-label">kegiatan</label>
                <input type="text" name="Nama" class="form-control" id="kegiatan" aria-describedby="emailHelp" />
              </div>
              <div class="mb-3 d-block d-md-flex justify-content-between">
                <div>
                  <label for="tglMulai" class="form-label">tanggal mulai</label>
                  <input type="date" name="TanggalMulai" class="form-control mb-3 mb-md-0" id="tglMulai" />
                </div>
                <div>
                  <label for="tglAkhir" class="form-label">tanggal akhir</label>
                  <input type="date" name="TanggalAkhir" class="form-control" id="tglAkhir" />
                </div>
              </div>
              <div class="mb-3">
                <label for="warna" class="form-label">warna label</label>
                <input type="color" name="WarnaLabel" class="form-control" id="warna" aria-describedby="emailHelp" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                close
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
    <!-- modal update -->
    <div class="modal fade text-capitalize" id="updateKaldik" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateKaldik" id="updateDataKaldik">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Kegiatan
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="kegiatan" class="form-label">kegiatan</label>
                <input type="text" name="Nama" class="form-control" id="kegiatan" :value="updateData.Nama"
                  aria-describedby="emailHelp" />
              </div>
              <div class="mb-3 d-block d-md-flex justify-content-between">
                <div>
                  <label for="tglMulai" class="form-label">tanggal mulai</label>
                  <input type="date" name="TanggalMulai" class="form-control mb-3 mb-md-0" id="tglMulai"
                    :value="updateData.TanggalMulai" />
                </div>
                <div>
                  <label for="tglAkhir" class="form-label">tanggal akhir</label>
                  <input type="date" name="TanggalAkhir" class="form-control" id="tglAkhir"
                    :value="updateData.TanggalAkhir" />
                </div>
              </div>
              <div class="mb-3">
                <label for="warna" class="form-label">warna label</label>
                <input type="color" name="WarnaLabel" class="form-control" id="warna" :value="updateData.WarnaLabel"
                  aria-describedby="emailHelp" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                close
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
import Swal from "sweetalert2";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('kaldik', ['btn', 'updateData']),
  },
  methods: {
    ...mapActions('kaldik', ['inputKaldik', 'updateKaldik']),
  },
};
</script>

<style scoped></style>
