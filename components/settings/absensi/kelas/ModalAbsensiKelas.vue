<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modalAbsen" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="santriAbsen" id="santriAbsen">
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
  computed: {
    ...mapState('kelasAbsensi', ['updateData', 'btn']),
  },
  methods: {
    ...mapActions('kelasAbsensi', ['santriAbsen'])
  },
};
</script>

<style lang="scss" scoped></style>
