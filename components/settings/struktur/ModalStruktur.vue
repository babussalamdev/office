<template>
  <div>
    <!-- modal input -->
    <div
      class="modal fade"
      id="inputDataStruktur"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputStruktur" ref="inputStruktur">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Struktur
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Sort</label>
                <input
                  name="Sort"
                  type="number"
                  class="form-control"
                  id="sort"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input
                  name="Nama"
                  type="text"
                  class="form-control"
                  id="nama"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Permissions</label>
                <multiselect
                  name="Permissions"
                  v-model="value"
                  class="text-capitalize"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag"
                  label="name"
                  track-by="code"
                  :options="options"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"
                  required
                ></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  Simpan
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Loading...</span>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- modal update -->
    <div
      class="modal fade"
      id="updateDataStruktur"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateStruktur" ref="updateStruktur">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Struktur
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="sort" class="form-label">Sort</label>
                <input
                  name="Sort"
                  type="number"
                  class="form-control"
                  id="sort"
                  :value="updateData.Sort"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input
                  name="Nama"
                  type="text"
                  class="form-control"
                  id="nama"
                  :value="updateData.Nama"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Permissions</label>
                <multiselect
                  name="Permissions"
                  v-model="value"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag"
                  label="name"
                  track-by="code"
                  :options="options"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"
                  required
                ></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">
                  Simpan
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
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
  props: ["updateData"],
  components: {
    Multiselect,
  },
  data() {
    return {
      btn: true,
      value: [],
      options: [
        { name: "data santri", code: 0 },
        { name: "kelas", code: 1 },
        { name: "asrama", code: 2 },
        { name: "halaqah", code: 3 },
        { name: "ekskull", code: 4 },
        { name: "pengampu", code: 5 },
        { name: "wali kelas", code: 6 },
        { name: "musyrif", code: 7 },
        { name: "mata pelajaran", code: 8 },
        { name: "setup halaqah", code: 9 },
        { name: "setup asrama", code: 10 },
        { name: "setup kelas", code: 11 },
        { name: "setup mapel", code: 12 },
      ],
    };
  },

  mounted() {
    document
      .getElementById("updateDataStruktur")
      .addEventListener("hidden.bs.modal", function () {
        this.value = [];
      });
  },
  watch: {
    updateData: "valueUpdate",
  },

  methods: {
    async inputStruktur(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Program"] = localStorage.getItem("program");
      data["Permissions"] = this.value.map((x) => x.name).join(",");
      try {
        const result = await this.$axios.$post(
          "/input-database?subject=struktur",
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

    async updateStruktur(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Permissions"] = this.value.map((x) => x.name).join(",");
      const key = this.updateData.SK;
      try {
        const program = localStorage.getItem("program");
        const result = await this.$axios.$put(
          `update-database?subject=struktur&program=${program}&code=${
            key.split("#")[1]
          }`,
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
        data["SK"] = key;
        this.$refs.updateStruktur.reset();
        this.value = [];
        this.$store.commit("struktur/updateStruktur", data);
        $("#updateDataStruktur").modal("hide");
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
