<template>
  <div>
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
                <label for="category" class="form-label">Category</label>
                <select name="category" class="form-select" required>
                  <option value="" disabled selected>-- select category pencatatan --</option>

                  <option v-for="cat in availableCategories" :key="cat.value" :value="cat.value">
                    {{ cat.label }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="name" class="form-label">Nama</label>
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
  import { mapState, mapActions } from "vuex";

  export default {
    data() {
      return {
        // Define all possible options here for a cleaner template
        allCategories: [
          { value: "hafalan baru", label: "Hafalan Baru" },
          { value: "murojaah", label: "Murojaah" },
          { value: "tilawah", label: "Tilawah" },
          { value: "tahsin", label: "Tahsin" },
        ],
      };
    },
    computed: {
      // Bring in updateDataPencatatan to check what the current item already has
      ...mapState("setupmutabaah", ["list", "btn", "updateDataPencatatan"]),

      availableCategories() {
        const usedKeys = this.updateDataPencatatan?.Pencatatan ? Object.keys(this.updateDataPencatatan.Pencatatan) : [];

        // 2. Filter the allCategories array to only include ones NOT in the usedKeys array
        return this.allCategories.filter((cat) => !usedKeys.includes(cat.value));
      },
    },
    methods: {
      ...mapActions("setupmutabaah", ["updatePencatatan"]),
    },
  };
</script>

<style lang="scss" scoped></style>
