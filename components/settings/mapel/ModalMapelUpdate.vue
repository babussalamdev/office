<template>
  <div>
    <!-- update modal -->
    <div class="modal fade" id="updateDataMapel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateMapel" id="updateMapel">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Mapel
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {{ updateData }}
              <div class="mb-3">
                <label for="sort" class="form-label">Sort</label>
                <input name="Sort" type="number" class="form-control" id="sort" :value="updateData?.Sort" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Mapel</label>
                <input name="Nama" type="text" class="form-control" id="nama" :value="updateData?.Nama" required />
              </div>
              <div class="mb-3">
                <label for="jurusan" class="form-label">Jurusan</label>
                <select name="Jurusan" id="jurusan" class="form-select" :value="updateData?.Jurusan" required>
                  <option value="non-jurusan" selected>Non-Jurusan</option>
                  <option v-for="(value, index) in jurusan" :key="index" :value="value.Nama">
                    {{ value.Nama }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Hari</label>
                <multiselect name="Hari" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
              </div>
              <div class="mb-3">
                <label for="nilai" class="form-label">Status Input Nilai</label>{{ status }}{{ updateData.Status }}
                <div class="mb-3 d-flex">
                  <div class="form-check form-check-inline d-flex align-items-center gap-1 p-0">
                    <input class="form-check-input m-0" type="radio" name="Status" id="open" v-model="updateData.Status"
                      value="open">
                    <label class="form-check-label" for="open">Open</label>
                  </div>
                  <div class="form-check form-check-inline  d-flex align-items-center gap-1  p-0">
                    <input class="form-check-input m-0" type="radio" name="Status" id="close"
                      v-model="updateData.Status" value="close">
                    <label class="form-check-label" for="close">Close</label>
                  </div>
                </div>
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
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  computed: {
    ...mapState("mapel", ["kelas", "jurusan", "selectKelas", 'btn', 'value', 'options', 'updateData', 'statusNilai']),
    ...mapGetters('mapel', ['getValue', 'getStatus']),
    value: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('mapel/setValue', value)
      }
    },
    status: {
      get() {
        return this.getStatus
      },
      set(value) {
        const obj = { key: 'statusNilai', value }
        this.$store.commit('mapel/setState', obj)
      }
    }
  },
  mounted() {
    document
      .getElementById("updateDataMapel")
      .addEventListener("hidden.bs.modal", function () {
        this.value = [];
      });
  },
  watch: {
    updateData: "valueUpdate",
  },

  methods: {
    ...mapActions('mapel', ['inputMapel', 'updateMapel']),
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },

    async valueUpdate() {
      const hari = this.updateData.Hari.split(', ');
      if (hari && hari.length > 0) {
        const mappedArray = hari.map((x) => {
          const option = this.options.find((option) => option.name === x);
          return { name: x, code: option ? option.code : null };
        });
        this.value = mappedArray;
      }
    },
  },
};
</script>

<style scoped></style>
