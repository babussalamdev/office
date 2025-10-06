<template>
  <div>
    <!-- input modal -->
    <div class="modal fade" id="InputDataMapel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputMapel" id="inputMapel">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Input Mapel</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Urutan</label>
                <input name="Sort" type="number" class="form-control" id="sort" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Mapel</label>
                <input name="Nama" type="text" class="form-control" id="nama" required />
              </div>
              <div class="mb-3">
                <label for="Kkm" class="form-label">Kriteria Ketuntasan Minima (KKM)</label>
                <input name="Kkm" type="number" class="form-control" id="Kkm" required min="0" max="100" />
              </div>
              <div class="mb-3">
                <label for="jurusan" class="form-label">Jurusan</label>
                <select name="Jurusan" id="jurusan" class="form-select" required>
                  <option value="Non-Jurusan" selected>Non-Jurusan</option>
                  <option v-for="(value, index) in jurusan" :key="index" :value="value.Nama">
                    {{ value.Nama }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Hari</label>
                <multiselect
                  name="Hari"
                  v-model="value"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag"
                  label="name"
                  track-by="code"
                  :options="options"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"
                  required></multiselect>
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
  import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
  import Multiselect from "vue-multiselect";

  export default {
    components: {
      Multiselect,
    },
    computed: {
      ...mapState("mapel", ["kelas", "jurusan", "selectKelas", "btn", "value", "options"]),
      ...mapGetters("mapel", ["getValue"]),
      value: {
        get() {
          return this.getValue;
        },
        set(value) {
          this.$store.commit("mapel/setValue", value);
        },
      },
    },

    methods: {
      ...mapActions("mapel", ["inputMapel"]),
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

<style scoped></style>
