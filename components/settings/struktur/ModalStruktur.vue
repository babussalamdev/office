<template>
  <div>
    <!-- modal input -->
    <div class="modal fade" id="inputDataStruktur" tabindex="-1" aria-labelledby="staticBackdropLabel" data-bs-backdrop="static" data-bs-keyboard="false" >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputStruktur" id="inputStruktur">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Struktur
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Sort</label>
                <input name="Sort" type="number" class="form-control" id="sort" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input name="Nama" type="text" class="form-control" id="nama" required />
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Permissions</label>
                <multiselect name="Permissions" v-model="value" class="text-capitalize"
                  tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code"
                  :options="options" :multiple="true" :taggable="true" @tag="addTag" required></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
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
import Multiselect from "vue-multiselect";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    Multiselect,
  },
  computed: {
    ...mapState('struktur', ['options', 'btn', 'value']),
    ...mapGetters('struktur', ['getValue']),
    value: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('struktur/setValue', value)
      }
    }
  },
  mounted() {
    document
      .getElementById("updateDataStruktur")
      .addEventListener("hidden.bs.modal", function () {
        this.value = [];
      });
  },

  methods: {
    ...mapActions('struktur', ['inputStruktur', 'updateStruktur']),
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
  },
};
</script>

<style scoped>
/* @import url("https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css"); */
</style>
