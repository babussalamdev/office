<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalAbsen" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="santriAbsen" ref="santriAbsen">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-capitalize" id="staticBackdropLabel">
                {{ updateData?.type }} - {{ updateData?.santri?.Nama }}
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <textarea name="Note" class="form-control" style="height: 100px"
                  placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                <label for="floatingTextarea">Catatan</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  {{ updateData?.type }}
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm"></span>
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      btn: true,
    };
  },
  computed: {
    ...mapState('kelasAbsensi', ['updateData']),
    ...mapState('index', ['label', 'semester'])
  },
  methods: {
    async santriAbsen() {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Status"] = this.updateData.type;
      data['Mapel'] = this.updateData.mapel
      data['Jam'] = this.updateData.jam
      const skSantri = this.updateData.santri.SK.replace('#', '%23')
      const tahun = this.label
      const semester = this.semester
      const time = this.updateData.time
      const namakelas = this.updateData.santri.Kelas
      const program = localStorage.getItem("program");
      try {
        const result = await this.$apiSantri.$put(
          `update-absensi-sisalam?sksantri=${skSantri}&type=${time}&thn=${tahun}&smstr=${semester}&program=${program}&subject=${namakelas}`,
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
          this.$refs.santriAbsen.reset();
          $("#modalAbsen").modal("hide");
          result['time'] = time
          result["SK"] = this.updateData.santri.SK;
          this.$store.commit('kelasAbsensi/updateAbsen', result);
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
