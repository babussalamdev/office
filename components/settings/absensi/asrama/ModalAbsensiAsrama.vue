<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalAbsen"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="santriAbsen" ref="santriAbsen">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-capitalize"
                id="staticBackdropLabel"
              >
                Absen - {{ updateData.santri?.Nama }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="form-floating">
                <textarea
                  name="NoteAsrama"
                  class="form-control"
                  style="height: 100px"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                ></textarea>
                <label for="floatingTextarea">Catatan</label>
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
                  Save Change
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
  props: ["updateData"],

  data() {
    return {
      btn: true,
    };
  },

  methods: {
    async santriAbsen() {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["StatusAsrama"] = this.updateData.type;
      const code = this.updateData.santri.SK.split("#")[1];
      const subject = this.updateData.santri.SK.split("#")[0];
      const program = localStorage.getItem("program");
      try {
        const result = await this.$axios.$post(
          `input-absensi?subject=${subject}&program=${program}&code=${code}&session=asrama`,
          data
        );
        if (result) {
          this.btn = true;
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diupdate",
            showConfirmButton: false,
            timer: 1500,
          });
          result["SK"] = this.updateData.santri.SK;
          this.$refs.santriAbsen.reset();
          this.$store.commit("asramaAbsensi/updateAbsen", result);
          $("#modalAbsen").modal("hide");
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          text: error,
          showConfirmButton: false,
          timer: 1500,
        });
        this.btn = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
