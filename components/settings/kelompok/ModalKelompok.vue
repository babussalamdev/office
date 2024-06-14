<template>
  <div>
    <!-- Modal Halaqah -->
    <div class="modal fade" id="InputDataHalaqoh" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputHalaqah" id="inputHalaqah">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Halaqoh
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Urutan</label>
                <input name="Sort" type="number" class="form-control" id="sort" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Halaqoh</label>
                <input name="Nama" type="text" class="form-control" id="nama" required />
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
    <!-- Modal Asrama -->
    <div class="modal fade" id="InputDataAsrama" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputAsrama" id="inputAsrama">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Asrama
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Sort</label>
                <input name="Sort" type="number" class="form-control" id="sort" />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Asrama</label>
                <input name="Nama" type="text" class="form-control" id="nama" />
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
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('kelompok', ['btn'])
  },
  methods: {
    ...mapActions('kelompok', ['inputHalaqah', 'inputAsrama']),
  },
};
</script>

<style></style>
