<template>
  <div>
    <!-- input database pegawai -->
    <div class="modal fade" id="InputDataPegawai" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                <label for="nama" class="form-label">Nama</label>
                <input name="Nama" type="text" class="form-control" id="nama" required />
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
                <input name="Nip" type="text" class="form-control" id="nip" required />
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
    <div class="modal fade" id="updateDataPegawaiAdmin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                <input name="Nama" type="text" class="form-control" id="nama" :value="updateData?.Nama" />
              </div>
              <div class="mb-3">
                <label for="lulusan" class="form-label">Lulusan</label>
                <select name="Lulusan" id="lulusan" class="form-select" :value="updateData?.Lulusan" required>
                  <option value="-" selected disabled>
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
                <input name="Nip" type="text" class="form-control" id="nip" :value="updateData?.Nip" />
              </div>
              <div class="mb-3">
                <label class="typo__label mb-2">Program</label>
                <multiselect name="Program" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
              </div>
              <div class="mb-3">
                <label for="nilai" class="form-label">Personalia</label>
                <div class="mb-3">
                  <select name="Personalia" id="" class="form-select" :value="updateData?.Personalia">
                    <option selected disabled value="">-- select --</option>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
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
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      lulusan: ''
    }
  },
  computed: {
    ...mapState('pegawai/database', ["select", 'btn', 'value', 'password', 'options', 'updateData', 'jabatanShow', 'program']),
    ...mapGetters('pegawai/database', ['getValue', 'getJabatan']),
    value: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('pegawai/database/setValue', value)
      }
    },
    jabatanShow: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('pegawai/database/setJabatan', value)
      }
    }
  },
  components: {
    Multiselect,
  },
  watch: {
    updateData: {
      handler(data) {
        const program = data?.Program;
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
    ...mapActions('pegawai/database', ['inputPegawai', 'updatePegawaiAdmin', 'updatePegawai']),
    ...mapMutations('pegawai/database', ['generatePassword']),
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

<style scoped></style>
