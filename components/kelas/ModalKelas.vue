<template>
  <div>
    <!-- input Jurusan -->
    <div
      class="modal fade text-capitalize"
      id="inputJurusan"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputJurusan" ref="inputJurusan">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="inputDataJurusan">
                Input Jurusan
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
                <label for="sort" class="form-label">Urut</label>
                <input name="Sort" type="text" class="form-control" id="sort" />
              </div>
              <div class="mb-3">
                <label for="jurusan" class="form-label">Nama Jurusan</label>
                <input
                  name="Nama"
                  type="text"
                  class="form-control"
                  id="jurusan"
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
    <!-- input Kelas -->
    <div
      class="modal fade text-capitalize"
      id="inputKelas"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputKelas" ref="inputKelas">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                input data kelas
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
                <label for="nama" class="form-label">nama kelas</label>
                <input
                  name="Nama"
                  type="text"
                  class="form-control"
                  id="nama"
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
    <!-- input ekskull -->
    <div
      class="modal fade text-capitalize"
      id="inputEkskull"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputEkskull" ref="inputEkskull">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                input ekskull
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
                <label for="sort" class="form-label">Urut</label>
                <input
                  name="Sort"
                  type="number"
                  class="form-control"
                  id="sort"
                />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Eskul</label>
                <input name="Nama" type="text" class="form-control" id="nama" />
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
    async inputKelas(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=kelas&code=idcls",
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
        this.$refs.inputKelas.reset();
        this.$store.commit("kelas/updateKelas", result);
        $("#inputKelas").modal("hide");
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
    async inputJurusan(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=jurusan&code=idfcl",
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
        this.$refs.inputJurusan.reset();
        this.$store.commit("kelas/updateJurusan", result);
        $("#inputJurusan").modal("hide");
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
    async inputEkskull(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=ekskull&code=ideks",
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
        this.$refs.inputEkskull.reset();
        this.$store.commit("kelas/updateEkskull", result);
        $("#inputEkskull").modal("hide");
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
