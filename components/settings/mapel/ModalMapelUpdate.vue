<template>
  <div>
    <!-- update modal -->
    <div class="modal fade" id="updateDataMapel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateMapel" id="updateMapel">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Mapel</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Urutan</label>
                <input name="Sort" type="number" class="form-control" id="sort" :value="updateData?.Sort" required />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Mapel</label>
                <input name="Nama" type="text" class="form-control" id="nama" :value="updateData?.Nama" required />
              </div>
              <div class="mb-3">
                <label for="Kkm" class="form-label">Kriteria Ketuntasan Minima (KKM)</label>
                <input name="Kkm" type="number" class="form-control" id="Kkm" :value="updateData?.Kkm" required min="0" max="100" />
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
              <div class="mb-3">
                <label for="nilai" class="form-label">Status Input Nilai</label>
                <div class="mb-3">
                  <select name="Status" id="" class="form-select" :value="updateData?.Status">
                    <option selected disabled value="">-- select --</option>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                  </select>
                </div>
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
      ...mapState("mapel", ["kelas", "jurusan", "selectKelas", "btn", "options", "updateData"]),
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
    mounted() {
      document.getElementById("updateDataMapel").addEventListener("hidden.bs.modal", function () {
        this.value = [];
      });
    },

    methods: {
      ...mapActions("mapel", ["inputMapel", "updateMapel"]),
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
