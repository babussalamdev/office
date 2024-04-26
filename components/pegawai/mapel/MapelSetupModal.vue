<template>
  <div>
    <div>
      <!-- update database pegawai  -->
      <div class="modal fade" id="mapelSetupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <form @submit.prevent="updateMapelSetup" ref="updateMapelSetup">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Update Mapel Setup
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="kelas" class="form-label">Halaqah</label>
                  <select name="Asrama" id="Asrama" class="form-select" v-model="pengajarShow" required>
                    <option value="" selected disabled>
                      -- Pilih Pengajar --
                    </option>
                    <option v-for="(value, index) in pengajar" :value="value" :key="index">
                      {{ value.Nama }}
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
      pengajarShow: "",
      unit: localStorage.getItem("program"),
    };
  },
  computed: {
    ...mapState("pegawai/mapel", ["pengajar"]),
  },
  // watch: {
  //   updateData: {
  //     handler(data) {
  //       this.halaqahShow = data.Halaqah[this.unit];
  //     },
  //   },
  // },
  methods: {
    async updateMapelSetup(event) {
      this.btn = false;
      const data = {};
      data["GSIPK1"] = this.pengajarShow.SK;
      data["Hari"] = this.updateData.Hari;

      try {
        const key = this.updateData.SK;
        const result = await this.$axios.$put(
          `/update-database?subject=setpengajar&program=${key.split("#")[0]
          }&kelas=${key.split("#")[1]}&code=${key.split("#")[2]}`,
          data
        );
        if (result.message === "Terjadi Bentrok Jam Mengajar") {
          Swal.fire({
            position: "center",
            icon: "warning",
            text: result.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          data["GSIPK1"] = this.pengajarShow.Nama;
          data["SK"] = key;
          this.btn = true;
          this.$store.commit("pegawai/mapel/setPengajar", data);
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$refs.updateMapelSetup.reset();
          $("#mapelSetupModal").modal("hide");
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
