<template>
  <div>
    <!-- input pelanggaran  -->
    <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputForm" ref="inputForm">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Data Pelanggaran
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 input-group">
                <select
                  name="Level"
                  id="Kelas"
                  class="form-select"
                  :value="updateRecord.Level"
                  required
                >
                  <option value="" selected disabled>Level</option>
                  <option value="kecil">Kecil</option>
                  <option value="sedang">Sedang</option>
                  <option value="besar">Besar</option>
                </select>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Poin"
                  name="Poin"
                  :value="updateRecord.Poin"
                />
              </div>
              <div class="form-floating mb-3">
                <textarea
                  :value="updateRecord.Pelanggaran"
                  name="Pelanggaran"
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style="height: 100px"
                ></textarea>
                <label for="floatingTextarea2">Jenis Pelanggaran</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  :value="updateRecord.Tindakan"
                  name="Tindakan"
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style="height: 100px"
                ></textarea>
                <label for="floatingTextarea2">Tindak Lanjut</label>
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
  props: ["updateRecord"],
  data() {
    return {
      btn: true,
      asramaShow: "",
      // unit: localStorage.getItem("program"),
    };
  },
  computed: {
    ...mapState("pelanggaran", ["updateData"]),
  },
  methods: {
    async inputForm(event) {
      // this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      const program = localStorage.getItem("program");
      const pk = this.updateRecord.PK;
      const sk = this.updateRecord.SK;
      const key = {
        PK: pk,
        SK: sk,
      };
      const poin = data.Poin - this.updateRecord.Poin;
      const datas = {
        poin,
        data,
        key,
        program,
      };
      try {
        const result = await this.$axios.$put(`update-pelanggaran`, datas);
        if (result) {
          this.btn = true;
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(result);
          // result["key"] = this.updateData.SK;
          // this.$store.commit("pelanggaran/updatePelanggaran", result);
          // this.asramaShow = "";
          // this.$emit("resetSelect");
          $("#inputModal").modal("hide");
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
    resetForm() {
      this.$refs.inputForm.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
