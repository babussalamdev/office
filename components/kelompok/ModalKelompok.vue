<template>
  <div>
    <!-- Modal Halaqah -->
    <div
      class="modal fade"
      id="InputDataHalaqoh"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputHalaqah" ref="inputHalaqah">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Halaqoh
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
                <label for="sort" class="form-label">Urutan</label>
                <input
                  name="Sort"
                  type="number"
                  class="form-control"
                  id="sort"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Halaqoh</label>
                <input
                  name="Nama"
                  type="text"
                  class="form-control"
                  id="nama"
                  required
                />
              </div>
              <!-- <div class="mb-3">
                <label for="program" class="form-label">program</label>
                <select
                  name="Program"
                  id="program"
                  class="form-select"
                  required
                >
                  <option value="" selected disabled>
                    -- Pilih Program --
                  </option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="Tahfidz">Tahfidz</option>
                </select>
              </div> -->
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
    <!-- Modal Asrama -->
    <div
      class="modal fade"
      id="InputDataAsrama"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputAsrama" ref="inputAsrama">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Asrama
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
                <label for="nama" class="form-label">Nama Asrama</label>
                <input name="Nama" type="text" class="form-control" id="nama" />
              </div>
              <!-- <div class="mb-3">
                <label for="program" class="form-label">program</label>
                <select
                  name="Program"
                  id="program"
                  class="form-select"
                  required
                >
                  <option value="" selected disabled>
                    -- Pilih Program --
                  </option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="Tahfidz">Tahfidz</option>
                </select>
              </div> -->
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
    async inputHalaqah(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=halaqah&code=idhal",
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
        this.$refs.inputHalaqah.reset();
        this.$store.commit("kelompok/updateHalaqah", result);
        $("#InputDataHalaqoh").modal("hide");
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
    async inputAsrama(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=asrama&code=idasr",
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
        this.$refs.inputAsrama.reset();
        this.$store.commit("kelompok/updateAsrama", result);
        $("#InputDataAsrama").modal("hide");
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

<style></style>
