<template>
  <div>
    <!-- modal input -->
    <div class="modal fade" id="inputDataPelanggaran" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputDataPelanggaran" id="inputPelanggaran">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Permissions Pelanggaran
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <select class="form-select" name="Struktur">
                  <option selected>-- Pilih Struktur --</option>
                  <option v-for="(data, index) in struktur" :key="index" :value="data.Nama">
                    {{ data.Nama }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Permissions</label>
                <multiselect v-model="value" class="text-capitalize" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </div>
              <div class="mb-3">
                <label for="" class="mb-3">Database</label>
                <select class="form-select" name="Database">
                  <option selected>-- Pilih Database --</option>
                  <option value="kelas">kelas</option>
                  <option value="asrama">asrama</option>
                  <option value="halaqah">halaqah</option>
                  <option value="ekskull">ekskull</option>
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

    <!-- modal update -->
    <div class="modal fade" id="updateDataPelanggaran" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateDataPelanggaran" id="updatePelanggaran">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Setup Pelanggaran
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <select class="form-select" name="Struktur" :value="updateData?.Struktur">
                  <option selected>-- Pilih Struktur --</option>
                  <option v-for="(data, index) in struktur" :key="index" :value="data.Nama">
                    {{ data.Nama }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Permissions</label>
                <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag"
                  label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"
                  required></multiselect>
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
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  mounted() {
    document
      .getElementById("updateDataPelanggaran")
      .addEventListener("hidden.bs.modal", function () {
        this.value = [];
      });
  },
  computed: {
    ...mapState("setuppelanggaran", ["struktur", 'btn', 'options', 'updateData']),
    ...mapGetters('setuppelanggaran', ['getValue']),
    value: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('setuppelanggaran/setValue', value)
      }
    }
  },
  watch: {
    updateData: "valueUpdate",
  },

  methods: {
    ...mapActions('setuppelanggaran', ['inputDataPelanggaran', 'updateDataPelanggaran']),
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },

    async valueUpdate() {
      const permissions = this.updateData.Permissions.split(",");
      if (permissions && permissions.length > 0) {
        const mappedArray = permissions.map((x) => {
          const option = this.options.find((option) => option.name === x);
          return { name: x, code: option ? option.code : null };
        });
        this.value = mappedArray;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css");
</style>
