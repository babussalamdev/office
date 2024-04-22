<template>
  <div>
    <!-- update modal -->
    <div
      class="modal fade"
      id="updateDataMapel"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateMapel" ref="updateMapel">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Mapel
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
                <label for="nama" class="form-label">Nama Mapel</label>
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
                <label for="jurusan" class="form-label">Jurusan</label>
                <select
                  name="Jurusan"
                  id="jurusan"
                  class="form-select"
                  :value="updateData.Jurusan"
                  required
                >
                  <option value="non-jurusan" selected>Non-Jurusan</option>
                  <option
                    v-for="(value, index) in jurusan"
                    :key="index"
                    :value="value.Nama"
                  >
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
                  required
                ></multiselect>
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

    <!-- input modal -->
    <div
      class="modal fade"
      id="InputDataMapel"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputMapel" ref="inputMapel">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Mapel
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
                <label for="nama" class="form-label">Nama Mapel</label>
                <input
                  name="Nama"
                  type="text"
                  class="form-control"
                  id="nama"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="jurusan" class="form-label">Jurusan</label>
                <select
                  name="Jurusan"
                  id="jurusan"
                  class="form-select"
                  required
                >
                  <option value="Non-Jurusan" selected>Non-Jurusan</option>
                  <option
                    v-for="(value, index) in jurusan"
                    :key="index"
                    :value="value.Nama"
                  >
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
                  required
                ></multiselect>
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
import { mapState } from "vuex";
import Multiselect from "vue-multiselect";

export default {
  props: ["updateData"],
  components: {
    Multiselect,
  },

  computed: {
    ...mapState("mapel", ["kelas", "jurusan", "selectKelas"]),
  },

  data() {
    return {
      btn: true,
      unit: "",
      value: [],
      options: [
        { name: "senin", code: 0 },
        { name: "selasa", code: 1 },
        { name: "rabu", code: 2 },
        { name: "kamis", code: 3 },
        { name: "jumat", code: 4 },
        { name: "sabtu", code: 5 },
        { name: "ahad", code: 6 },
      ],
    };
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
    async inputMapel(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Kelas"] = this.selectKelas;
      data["Program"] = localStorage.getItem("program");
      data["Hari"] = this.value.map((x) => x.name).join(",");
      console.log(data);
      try {
        const result = await this.$axios.$post(
          `/input-database?subject=mapel`,
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
        this.$refs.inputMapel.reset();
        this.value = [];
        this.$store.commit("mapel/inputMapel", result);
        $("#InputDataMapel").modal("hide");
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
    async updateMapel(event) {
      this.btn = false;
      const data = Object.fromEntries(new FormData(event.target));
      data["Hari"] = this.value.map((x) => x.name).join(",");
      console.log(data);
      const key = this.updateData.SK;
      try {
        const result = await this.$axios.$put(
          `/update-database?subject=mapel&program=${key.split("#")[0]}&kelas=${
            key.split("#")[1]
          }&code=${key.split("#")[2]}`,
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
        this.$refs.updateMapel.reset();
        this.value = [];
        this.$store.commit("mapel/updateMapel", data);
        $("#updateDataMapel").modal("hide");
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
      const hari = this.updateData.Hari.split(",");
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
