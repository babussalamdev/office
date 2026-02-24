<template>
  <div>
    <!-- update database pegawai  -->
    <div class="modal fade" id="updateDataHalaqahIdhofi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateHalaqahIdhofi" ref="updateDataHalaqahIdhofi">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Data Idhofi</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="kelas" class="form-label">Halaqah</label>
                <select name="Asrama" id="Asrama" class="form-select" v-model="halaqahShow" required>
                  <option value="off" selected disabled>-- Pilih Halaqah --</option>
                  <option v-for="(value, index) in halaqahidhofi" :value="value" :key="index">
                    {{ value }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">simpan</button>
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
        halaqahShow: "",
        unit: localStorage.getItem("program"),
      };
    },
    computed: {
      ...mapState("pegawai/halaqahIdhofi", ["halaqahidhofi"]),
    },
    watch: {
      updateData: {
        handler(data) {
          this.halaqahShow = data.HalaqahIdhofi[this.unit];
        },
      },
    },
    methods: {
      async updateHalaqahIdhofi(event) {
        this.btn = false;
        const data = {};
        const program = localStorage.getItem("program");
        data["Value"] = this.halaqahShow;
        data["Program"] = program;
        try {
          const user = this.updateData.Username;
          const key = this.updateData.SK;
          const result = await this.$axios.$put(`update-pegawai?subject=HalaqahIdhofi&username=${user}&sk=${key}`, data);
          if (result) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            data["SK"] = key;
            this.btn = true;
            this.$store.commit("pegawai/halaqahIdhofi/updateHalaqah", data);
            this.$refs.updateDataHalaqahIdhofi.reset();
            $("#updateDataHalaqahIdhofi").modal("hide");
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
