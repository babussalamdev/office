<template>
  <div>
    <!-- modal input -->
    <div class="modal fade" id="inputDataStruktur" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputStruktur" ref="inputStruktur">
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
                <multiselect name="Permissions" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
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

    <!-- modal update -->
    <div class="modal fade" id="editDataStruktur" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="editStruktur" ref="editStruktur">
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
                <multiselect name="Permissions" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
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

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      btn: true,
      value: [],
      options: [
        { name: "mutabaah-rekap", code: "mr" },
        { name: "santri-database", code: "sb" },
        { name: "santri-kelas", code: "sk" },
        { name: "santri-asrama", code: "sa" },
        { name: "santri-halaqah", code: "sh" },
        { name: "santri-ekskull", code: "se" },
        { name: "pegawai-pegawai", code: "pp" },
        { name: "pegawai-halaqah", code: "ph" },
        { name: "pegawai-walas", code: "pw" },
        { name: "pegawai-musyrif", code: "pm" },
        { name: "pegawai-mapel", code: "pl" },
        { name: "settings-periode", code: "sp" },
        { name: "settings-kelompok", code: "sk" },
        { name: "settings-kelas", code: "ss" },
        { name: "settings-mapel", code: "sm" },
        { name: "settings-kaldik", code: "sd" },
        { name: "settings-struktur", code: "sr" },
        { name: "settings-permission", code: "sp" },
      ],
    };
  },
  methods: {
    async inputStruktur(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      data["Permissions"] = this.value.map((x) => x.name);
      console.log(data);
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=struktur&id=idstr",
          data
        );
        this.btn = true;
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$refs.inputStruktur.reset();
        this.value = [];
        this.$store.commit("struktur/inputStruktur", result);
        $("#inputDataStruktur").modal("hide");
      } catch (error) {
        this.btn = true;
        Swal.fire({
          icon: "warning",
          text: error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

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
@import url("https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css");
</style>
