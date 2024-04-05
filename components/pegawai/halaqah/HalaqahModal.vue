<template>
  <div>
    <!-- update database pegawai  -->
    <div
      class="modal fade"
      id="updateDataMusyrif"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateMusyrif" ref="updateDataMusyrif">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Data Musyrif
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
                <label for="kelas" class="form-label">Asrama</label>
                <select
                  name="Asrama"
                  id="Asrama"
                  class="form-select"
                  v-model="asramaShow"
                  required
                >
                  <option value="" selected disabled>-- Pilih Asrama --</option>
                  <option
                    v-for="(value, index) in asrama"
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

export default {
  props: ["updateData"],
  data() {
    return {
      btn: true,
      asramaShow: "",
    };
  },
  computed: {
    ...mapState("pegawai/musyrif", ["asrama"]),
  },
  methods: {
    async updateWalas(event) {
      //   this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data);
      //   try {
      //     const result = await this.$axios.$post(
      //       `/input-pegawai?method=single`,
      //       data
      //     );
      //     if (result) {
      //       Swal.fire({
      //         position: "center",
      //         icon: "success",
      //         text: "Your work has been saved",
      //         showConfirmButton: false,
      //         timer: 1500,
      //       });
      //       this.btn = true;
      //       this.$store.commit("pegawai/database/inputPegawaiSingle", result);
      //       this.$refs.inputDataPegawai.reset();
      //       this.value = [];
      //       this.password = "";
      //       $("#InputDataPegawai").modal("hide");
      //     }
      //   } catch (error) {
      //     this.btn = true;
      //     console.log(error);
      //     Swal.fire({
      //       text: error,
      //       icon: "error",
      //       timer: 3000,
      //       timerProgressBar: false,
      //       showConfirmButton: false,
      //     });
      //   }
    },
  },
};
</script>

<style lang="scss" scoped></style>
