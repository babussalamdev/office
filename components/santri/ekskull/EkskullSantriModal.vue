<template>
  <div>
    <!-- update database pegawai  -->
    <div class="modal fade" id="updateDataSantriEkskull" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateDataSantriEkskull" ref="updateDataSantriEkskull">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Bulk Update Ekskull
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="Kelas" class="form-label">Ekskull</label>
                <select name="value" id="Kelas" class="form-select" v-model="ekskullShow" required>
                  <option value="" selected disabled>
                    -- Pilih Ekskull --
                  </option>
                  <option v-for="(value, index) in selectEkskull" :value="value" :key="index">
                    {{ value }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  simpan
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
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
      ekskullShow: "",
      // unit: localStorage.getItem("program"),
    };
  },
  computed: {
    ...mapState("santri/ekskull", ["selectEkskull"]),
  },
  methods: {
    async updateDataSantriEkskull(event) {
      this.btn = false;
      const data = {};
      const program = localStorage.getItem("program");
      data["value"] = this.ekskullShow;
      data["sort"] = this.updateData;
      try {
        const result = await this.$axios.$put(
          `update-santri?sk&program=${program}&bulk=Ekskull`,
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
          this.$emit("resetSelect");
          this.$store.commit("santri/ekskull/updateEkskullSantri", data);
          this.ekskullShow = "";
          $("#updateDataSantriEkskull").modal("hide");
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
