<template>
  <div>
    <!-- input modal -->
    <div class="modal fade" id="inputDataQuranPenilaian" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputDataPenilaian" id="inputQuranPenilaian">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Input Penilaian</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Updated Nama Field to Select Option -->
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <select name="nama" class="form-select" id="nama" required>
                  <option value="" disabled selected>-- Pilih Penilaian --</option>
                  <option value="Ujian Juz">Ujian Juz</option>
                  <option value="Pencapaian">Pencapaian</option>
                  <option value="UAS">UAS</option>
                  <option value="Adab Akhla">Adab Akhla</option>
                </select>
              </div>

              <!-- Fixed label 'for' and input 'id' to match -->
              <div class="mb-3">
                <label for="bobot" class="form-label">Bobot</label>
                <input name="bobot" type="number" class="form-control" id="bobot" required max="100" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Simpan</button>
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
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    computed: {
      ...mapState("setuppenilaiantahfidz", ["updateDataPenilaian", "btn"]),
    },
    methods: {
      ...mapActions("setuppenilaiantahfidz", ["inputDataPenilaian"]),
      // inputDataPenilaian(event) {
      //   const data = Object.fromEntries(new FormData(event.target))
      //   console.log(data)
      // },
    },
  };
</script>

<style lang="scss" scoped></style>
