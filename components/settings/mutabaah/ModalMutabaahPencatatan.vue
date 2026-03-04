<template>
  <div>
    <!-- update modal -->
    <div class="modal fade" id="updateDataMutabaahPenilaian" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updatePencatatan" id="updatePencatatan">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Pencatatan</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="nama" class="form-label">Category</label>
                <select name="category" class="form-select">
                  <option value="">-- select category pencatatan --</option>
                  <option value="hafalan baru">Hafalan Baru</option>
                  <option value="murojaah">Murojaah</option>
                  <option value="tilawah">Tilawah</option>
                  <option value="tahsin">Tahsin</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input name="name" type="text" class="form-control" id="sort" required maxlength="32" />
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
      ...mapState("setupmutabaah", ["btn"]),
    },
    methods: {
      ...mapActions("setupmutabaah", ["updatePencatatan"]),
    },
  };
</script>

<style lang="scss" scoped></style>
