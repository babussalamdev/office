<template>
  <div>
    <div
      class="modal fade"
      id="InputDataMapel"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputMapel" ref="inputMapel">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Mapel
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
                <label for="sort" class="form-label">Sort</label>
                <input
                  name="Sort"
                  type="number"
                  class="form-control"
                  id="sort"
                />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Mapel</label>
                <input name="Nama" type="text" class="form-control" id="nama" />
              </div>
              <div class="mb-3">
                <label for="kelas" class="form-label">Kelas</label>
                <select name="Kelas" id="kelas" class="form-select" required>
                  <option value="" selected disabled>-- Pilih Kelas --</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="Tahfidz">Tahfidz</option>
                </select>
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
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  Simpan
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
    async inputMapel(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      this.$refs.inputMapel.reset();
      console.log(data);
      this.btn = true;
      // try {
      //   const result = await this.$axios.$post(
      //     "/input-database?halaqah=idhal",
      //     data
      //   );
      //   this.btn = true;
      //   Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     text: "Data berhasil di input",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      //   this.$refs.inputHalaqah.reset();
      //   this.$emit("updateHalaqah", result);
      //   $("#InputDataHalaqoh").modal("hide");
      // } catch (error) {
      //   this.btn = true;
      //   Swal.fire({
      //     icon: "warning",
      //     text: error,
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
    },
  },
};
</script>

<style scoped></style>
