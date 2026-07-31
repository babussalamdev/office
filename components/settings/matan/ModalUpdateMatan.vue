<template>
  <div>
    <!-- input modal -->
    <div class="modal fade" id="updatematan" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="submitForm" id="updateMatan">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Matan</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="Nama" class="form-label">Nama</label>
                <input name="Nama" type="text" class="form-control" id="Nama" :value="this.updateDataMatan.Nama" required />
              </div>
              <div class="mb-3">
                <label for="Pencapaian" class="form-label">Pencapaian</label>
                <input name="Pencapaian" type="number" class="form-control" id="Pencapaian" :value="this.updateDataMatan.Pencapaian" required />
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
  import { mapState, mapActions } from "vuex";

  export default {
    computed: {
      ...mapState("matan", ["updateDataMatan", "btn"]),
    },
    methods: {
      ...mapActions("matan", ["updateMatan"]),

      submitForm(event) {
        this.updateMatan({
          event: event,
          SK: this.updateDataMatan.SK,
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
