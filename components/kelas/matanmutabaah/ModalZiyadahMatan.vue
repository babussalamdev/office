<template>
  <div>
    <!-- Modal update -->
    <div
      class="modal fade hide"
      id="mutabaahupdate"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitUpdate" id="mutabaahupdatemodal">
            <div class="modal-body">
              <div class="row">
                <div class="mb-3 col-6">
                  <label class="typo__label mb-2">Dari Halaman</label>
                  <input type="number" class="form-control" v-model="fromPage" min="1" required />
                </div>
                <div class="mb-3 col-6">
                  <label class="typo__label mb-2">Sampai Halaman</label>
                  <input type="number" class="form-control" v-model="toPage" min="1" required />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col">
                  <div class="input-group">
                    <span class="input-group-text">Total Hal.</span>
                    <input type="number" name="Page" id="halaman" class="form-control bg-light" :value="pageupdate" readonly />
                  </div>
                </div>

                <div class="mb-3 col">
                  <div class="input-group">
                    <span class="input-group-text">Nilai</span>
                    <!-- FIX: Changed to v-model="score" -->
                    <input type="number" step="any" name="Score" id="score" class="form-control" v-model="score" min="0" max="100" required />
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <div class="form-floating">
                  <!-- FIX: Changed to v-model="note" -->
                  <textarea
                    name="Note"
                    id="catatan"
                    class="form-control"
                    v-model="note"
                    placeholder="Leave a comment here"
                    style="height: 100px"></textarea>
                  <label for="catatan">Catatan</label>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetModalUpdate()">Close</button>
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
  import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapState("mutabaahmatan", ["updateData", "pageupdate", "btn"]),

      // Mapped Getters for the Update Modal
      ...mapGetters("mutabaahmatan", ["getFromPageUpdate", "getToPageUpdate", "getScoreUpdate", "getNoteUpdate"]),

      fromPage: {
        get() {
          return this.getFromPageUpdate;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/setFromPageUpdate", value);
        },
      },
      toPage: {
        get() {
          return this.getToPageUpdate;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/setToPageUpdate", value);
        },
      },

      // FIX: Added computed property for score
      score: {
        get() {
          return this.getScoreUpdate;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/setScoreUpdate", value);
        },
      },

      // FIX: Added computed property for note
      note: {
        get() {
          return this.getNoteUpdate;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/setNoteUpdate", value);
        },
      },
    },
    methods: {
      ...mapActions("mutabaahmatan", ["submitUpdate"]),
      ...mapMutations("mutabaahmatan", ["resetModalUpdate"]),
    },
  };
</script>

<style scoped>
  form label {
    font-size: 14px;
    font-weight: 500;
  }
</style>
