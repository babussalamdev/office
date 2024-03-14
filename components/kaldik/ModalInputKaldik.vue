<template>
  <div
    class="modal fade text-capitalize"
    id="inputKaldik"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="inputKaldik" ref="inputKaldik">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              kegiatan baru
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="kegiatan" class="form-label">kegiatan</label>
              <input
                type="text"
                name="Nama"
                class="form-control"
                id="kegiatan"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3 d-block d-md-flex justify-content-between">
              <div>
                <label for="tglMulai" class="form-label">tanggal mulai</label>
                <input
                  type="date"
                  name="Mulai"
                  class="form-control mb-3 mb-md-0"
                  id="tglMulai"
                />
              </div>
              <div>
                <label for="tglAkhir" class="form-label">tanggal akhir</label>
                <input
                  type="date"
                  name="Berakhir"
                  class="form-control"
                  id="tglAkhir"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="warna" class="form-label">warna label</label>
              <input
                type="color"
                name="Warna"
                class="form-control"
                id="warna"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              close
            </button>
            <span>
              <button v-if="btn" type="submit" class="btn btn-primary">
                simpan
              </button>
              <button v-else class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      btn: true,
    };
  },
  methods: {
    async inputKaldik(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=kaldik&code=idkal",
          data
        );
        this.btn = true;
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$refs.inputKaldik.reset();
        this.$store.commit("kaldik/inputKaldik", result);
        $("#inputKaldik").modal("hide");
      } catch (error) {
        this.btn = true;
        Swal.fire({
          icon: "warning",
          text: error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
};
</script>

<style scoped></style>
