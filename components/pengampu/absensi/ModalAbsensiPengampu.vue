<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalAbsen" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="santriAbsen" ref="santriAbsen">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-capitalize" id="staticBackdropLabel">
                {{ updateData?.type }} - {{ updateData?.pegawai?.Nama }}
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating">
                <textarea name="Note" class="form-control" style="height: 100px"
                  placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                <label for="floatingTextarea">Catatan</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  {{ updateData?.type }}
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
import Swal from "sweetalert2";
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      btn: true,
    };
  },
  computed: {
    ...mapState('pengampu', ['updateData'])
  },
  methods: {
    async santriAbsen() {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Status"] = this.updateData.type;
      const skSantri = this.updateData.pegawai.SK
      const time = this.updateData.time
      const program = localStorage.getItem("program");
      try {
        const result = await this.$apiBase.$put(
          `update-absensi?type=pengampu${time}&skpegawai=${skSantri}`,
          data
        );
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diupdate",
            showConfirmButton: false,
            timer: 1500,
          });
          this.btn = true;
          this.$refs.santriAbsen.reset();
          $("#modalAbsen").modal("hide");
          result['time'] = time
          result["SK"] = this.updateData.pegawai.SK;
          this.$store.commit('pengampu/updateAbsen', result);
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
