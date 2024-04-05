<template>
  <div>
    <!-- update database pegawai  -->
    <div
      class="modal fade"
      id="updateDataWalas"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateWalas" ref="updateDataWalas">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Data Wali Kelas
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
                <label for="kelas" class="form-label">Kelas</label>
                <select
                  name="Kelas"
                  id="kelas"
                  class="form-select"
                  v-model="walasShow"
                  required
                >
                  <option value="off" selected disabled>
                    -- Belum Dipilih --
                  </option>
                  <option
                    v-for="(value, index) in kelas"
                    :value="value"
                    :key="index"
                  >
                    {{ value }}
                  </option>
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
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  props: ["updateData"],
  data() {
    return {
      btn: true,
      walasShow: "",
      unit: localStorage.getItem("program"),
    };
  },

  watch: {
    updateData: {
      handler(data) {
        this.walasShow = data.Kelas[this.unit];
      },
    },
  },

  computed: {
    ...mapState("pegawai/walas", ["kelas"]),
  },

  methods: {
    async updateWalas(event) {
      this.btn = false;
      // const data = Object.fromEntries(new FormData(event.target));
      const data = {};
      const program = localStorage.getItem("program");
      data["Value"] = this.walasShow;
      data["Program"] = program;
      try {
        const user = this.updateData.Username;
        const key = this.updateData.SK;
        const result = await this.$axios.$put(
          `update-pegawai?subject=Kelas&username=${user}&id=${key}`,
          data
        );
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.btn = true;
          data["SK"] = key;
          this.$store.commit("pegawai/walas/updateWalas", data);
          this.$refs.updateDataWalas.reset();
          $("#updateDataWalas").modal("hide");
        }
      } catch (error) {
        this.btn = true;
        console.log(error);
        Swal.fire({
          text: error,
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

<style lang="scss" scoped></style>
