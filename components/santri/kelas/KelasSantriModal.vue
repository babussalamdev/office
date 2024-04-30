<template>
  <div>
    <!-- update database pegawai  -->
    <div
      class="modal fade"
      id="updateDataSantriKelas"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form
            @submit.prevent="updateDataSantriKelas"
            ref="updateDataSantriKelas"
          >
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Bulk Update kelas
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
                <label for="Kelas" class="form-label">Halaqah</label>
                <select
                  name="value"
                  id="Kelas"
                  class="form-select"
                  v-model="kelasShow"
                  required
                >
                  <option value="" selected disabled>-- Pilih Kelas --</option>
                  <option
                    v-for="(value, index) in select"
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
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  props: ["updateData"],
  data() {
    return {
      btn: true,
      kelasShow: "",
      // unit: localStorage.getItem("program"),
    };
  },
  computed: {
    ...mapState("santri/kelas", ["select"]),
  },
  methods: {
    async updateDataSantriKelas(event) {
      this.btn = false;
      const data = {};
      const program = localStorage.getItem("program");
      data["value"] = this.kelasShow;
      data["sort"] = this.updateData;
      console.log(data, program);
      try {
        const user = this.updateData.Username;
        const key = this.updateData.SK;
        const result = await this.$axios.$put(
          `update-santri?subject=none&code=none&program=${program}&bulk=Kelas`,
          data
        );
        if (result) {
          this.btn = true;
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.commit("santri/kelas/updateKelasSantri", data);
          this.$emit("resetSelect");
          this.kelasShow = "";
          $("#updateDataSantriKelas").modal("hide");
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
