<template>
  <div>
    <!-- Modal -->
    <div class="modal fade hide" id="mutabaah" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submit" id="mutabaahForm">
            <div class="modal-body">
              <div class="row">
                <!-- Dari Halaman -->
                <div class="mb-3 col-6">
                  <label class="typo__label mb-2">Dari Halaman</label>
                  <input type="number" class="form-control" v-model="fromPage" min="1" placeholder="Misal: 1" required />
                </div>

                <!-- Sampai Halaman -->
                <div class="mb-3 col-6">
                  <label class="typo__label mb-2">Sampai Halaman</label>
                  <input type="number" class="form-control" v-model="toPage" min="1" placeholder="Misal: 5" required />
                </div>
              </div>

              <div class="row">
                <!-- Total Halaman (Auto Calculated) -->
                <div class="mb-3 col">
                  <div class="input-group">
                    <span class="input-group-text">Total Hal.</span>
                    <input type="number" name="Page" id="halaman" class="form-control bg-light" :value="page" readonly />
                  </div>
                </div>

                <!-- Nilai -->
                <div class="mb-3 col">
                  <div class="input-group">
                    <span class="input-group-text">Nilai</span>
                    <input type="number" name="Score" id="score" class="form-control" value="0" max="100" min="0" required />
                  </div>
                </div>
              </div>

              <!-- Catatan -->
              <div>
                <div class="form-floating">
                  <textarea name="Note" id="catatan" class="form-control" placeholder="Leave a comment here" style="height: 100px"></textarea>
                  <label for="catatan">Catatan</label>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Save</button>
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
  import { mapState, mapGetters, mapActions } from "vuex";

  export default {
    data() {
      return {
        subject: localStorage.getItem("subject"),
      };
    },
    computed: {
      ...mapState("mutabaahmatan", ["detail", "page", "btn"]),
      ...mapGetters("mutabaahmatan", ["GET_FROM_PAGE", "GET_TO_PAGE"]),

      fromPage: {
        get() {
          return this.GET_FROM_PAGE;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/SET_FROM_PAGE", value);
        },
      },
      toPage: {
        get() {
          return this.GET_TO_PAGE;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/SET_TO_PAGE", value);
        },
      },
    },
    methods: {
      ...mapActions("mutabaahmatan", ["submit"]),
    },
  };
</script>

<style scoped>
  label {
    font-size: 14px;
    font-weight: 500;
  }
</style>
