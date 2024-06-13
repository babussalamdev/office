<template>
  <div>
    <!-- input database pegawai -->
    <div class="modal fade" id="InputDataPegawai" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputPegawai" id="inputPegawaiForm">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Data Pegawai
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input name="Username" type="text" class="form-control" id="username" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <input type="text" name="Password" id="password" v-model="password" class="form-control" required
                    disabled />
                  <span>
                    <button v-if="btn" class="btn btn-success" type="button" id="inputGroupFileAddon04"
                      @click="generatePassword">
                      Generate
                    </button>
                    <button v-else class="btn btn-success btn-sm" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span class="visually-hidden" role="status">Loading...</span>
                    </button>
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input name="Nama" type="text" class="form-control" id="nama" />
              </div>
              <div class="mb-3">
                <label for="lulusan" class="form-label">Lulusan</label>
                <select name="Lulusan" class="form-select" id="lulusan" aria-label="Default select example" required>
                  <option selected>-- Pilih Lulusan --</option>
                  <option value="sd">SD</option>
                  <option value="smp">SMP</option>
                  <option value="sma">SMA</option>
                  <option value="diploma">Diploma</option>
                  <option value="sarjana">Sarjana</option>
                  <option value="magister">Magister</option>
                  <option value="doktoral">Doktoral</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="nip" class="form-label">NIP</label>
                <input name="Nip" type="text" class="form-control" id="nip" />
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Program</label>
                <multiselect name="Program" v-model="value" tag-placeholder="Add this as new tag"
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
                  simpan
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
    <!-- update database pegawai Admin -->
    <div class="modal fade" id="updateDataPegawaiAdmin" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updatePegawaiAdmin" id="updatePegawaiAdmin">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Data Pegawai ( Admin )
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input name="Nama" type="text" class="form-control" id="nama" :value="updateData.Nama" />
              </div>
              <div class="mb-3">
                <label for="lulusan" class="form-label">Lulusan</label>
                <select name="Lulusan" id="lulusan" class="form-select" :value="updateData.Lulusan" required>
                  <option value="" selected disabled>
                    -- Pilih Lulusan --
                  </option>
                  <option value="sd">SD</option>
                  <option value="smp">SMP</option>
                  <option value="sma">SMA</option>
                  <option value="diploma">Diploma</option>
                  <option value="sarjana">Sarjana</option>
                  <option value="magister">Magister</option>
                  <option value="doktoral">Doktoral</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="nip" class="form-label">NIP</label>
                <input name="Nip" type="text" class="form-control" id="nip" :value="updateData.Nip" />
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Program</label>
                <multiselect name="Program" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
              </div>
              <div class="mb-3">
                <label for="personalia" class="form-label mb-2">Personalia</label>
                <div class="d-flex gap-4">
                  <div class="form-check d-flex align-items-center justify-content-center gap-2">
                    <input value="off" class="form-check-input" type="radio" name="Personalia" id="flexRadioDefault2"
                      :checked="updateData.Personalia === 'on' ? false : true" />
                    <label class="form-check-label mt-1" for="flexRadioDefault2">
                      Off
                    </label>
                  </div>
                  <div class="form-check d-flex align-items-center justify-content-center gap-2">
                    <input value="on" class="form-check-input" type="radio" name="Personalia" id="flexRadioDefault1"
                      :checked="updateData.Personalia === 'on' ? true : false" />
                    <label class="form-check-label mt-1" for="flexRadioDefault1">
                      On
                    </label>
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
                  simpan
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
    <!-- update database pegawai  -->
    <!-- <div
      class="modal fade"
      id="updateDataPegawai"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updatePegawai" ref="updateDataPegawai">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Data Pegawai
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
                <label for="jabatan" class="form-label">Jabatan</label>
                <select
                  name="Jabatan"
                  id="jabatan"
                  class="form-select"
                  v-model="jabatanShow"
                  :value="updateData.Lulusan"
                  required
                >
                  <option value="" selected disabled>
                    -- Pilih Jabatan --
                  </option>
                  <option
                    v-for="(value, index) in select"
                    :value="value"
                    :key="index"
                  >
                    {{ value }}
                  </option>
                </select>
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
                  simpan
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
    </div> -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      jabatanShow: "",
    };
  },
  computed: {
    ...mapState('pegawai/database', ["select", 'btn', 'value', 'password', 'options', 'updateData']),
    ...mapGetters('pegawai/database', ['getValue']),
    value: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('pegawai/database/setValue', value)
      }
    }
  },
  components: {
    Multiselect,
  },
  watch: {
    updateData: {
      handler(data) {
        const program = data.Program;
        if (program && program.length > 0) {
          const programArray = program.split(","); // Memisahkan string menjadi array dan menghapus spasi ekstra
          const mappedArray = programArray.map((x) => {
            const option = this.options.find((option) => option.name === x);
            return { name: x, code: option ? option.code : null };
          });
          this.value = mappedArray;
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions('pegawai/database', ['inputPegawai', 'updatePegawaiAdmin']),
    ...mapMutations('pegawai/database', ['generatePassword']),
    async updatePegawai(event) {
      this.btn = false;
      const data = {};
      const program = localStorage.getItem("program");
      data["Program"] = program;
      data["Value"] = this.jabatanShow;
      try {
        const username = this.updateData.Username;
        const id = this.updateData.SK;
        const result = await this.$axios.$put(
          `update-pegawai?subject=Jabatan&username=${username}&id=${id}`,
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
        result["SK"] = id;
        this.$refs.updateDataPegawai.reset();
        this.value = [];
        this.$emit("deleteUpdateData");
        this.$store.commit("pegawai/database/updatePegawaiJabatan", result);
        $("#updateDataPegawai").modal("hide");
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
    async valueUpdate() { },
  },
};
</script>

<style lang="scss" scoped></style>
