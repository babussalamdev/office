<template>
  <div
    class="modal fade"
    id="InputDataSantri"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="inputSantri" ref="inputDataSantri">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Input Data Santri
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
              <label for="nis" class="form-label">NIS</label>
              <input
                name="NIS"
                type="text"
                class="form-control"
                id="nis"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nama" class="form-label">Nama Santri</label>
              <input
                name="Nama"
                type="text"
                class="form-control"
                id="nama"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nama" class="form-label">Angkatan</label>
              <select
                name="Angkatan"
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected>-- Pilih angkatan --</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="Orangtua" class="form-label">Orang Tua</label>
              <input
                name="ortu"
                type="text"
                class="form-control"
                id="ortu"
                required
              />
            </div>
            <div class="mb-3">
              <label for="Alamat" class="form-label">Alamat</label>
              <input
                name="Alamat"
                type="text"
                class="form-control"
                id="alamat"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nisn" class="form-label">NISN</label>
              <input
                name="NISN"
                type="text"
                class="form-control"
                id="nisn"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  methods: {
    async inputSantri(event) {
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data);
      try {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$refs.inputDataSantri.reset();
        $("#InputDataSantri").modal("hide");
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: res.message,
          icon: "error",
          timer: 3000,
          timerProgressBar: false,
          showConfirmButton: false,
        });
      }
    },
  },
};
</script>

<style scoped></style>
