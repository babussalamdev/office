<template>
  <div>
    <div class="modal fade" id="InputDataUtama" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputUtama" id="inputUtama">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Mapel
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Sort</label>
                <input name="Sort" type="number" class="form-control" id="sort" />
              </div>
              <div class="mb-3">
                <label for="semester" class="form-label">Semester</label>
                <select name="Semester" id="semester" class="form-select" required>
                  <option value="" selected disabled>
                    -- Pilih Semester --
                  </option>
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="tahun" class="form-label">Tahun</label>
                <select name="Tahun" id="tahun" class="form-select" required>
                  <option value="" selected disabled>-- Pilih Tahun --</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  Simpan
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
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('periode', ['btn'])
  },
  methods: {
    ...mapActions('periode', ['inputUtama'])
  },
};
</script>

<style scoped></style>
