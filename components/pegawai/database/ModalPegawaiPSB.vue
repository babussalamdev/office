<template>
  <div>
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
                <label class="typo__label mb-2">Program</label>
                <multiselect name="Program" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
              </div>
              <div class="mb-3">
                <label class="form-label" for="select"></label>
                <select class="form-select" name="Role" id="select">
                  <option value="" selected disabled>-- select --</option>
                  <option value="Admin">Admin</option>
                  <option value="Admin">Penguji</option>
                  <option value="Admin">Customer Service</option>
                </select>
              </div>
              <!-- <div class="mb-3">
                <label for="personalia" class="form-label mb-2">Personalia</label>
                <div class="d-flex gap-4">
                  <div class="form-check d-flex align-items-center justify-content-center gap-2">
                    <input value="off" class="form-check-input" type="radio" name="Personalia" id="flexRadioDefault2"
                      :checked="updateData?.Personalia === 'on' ? false : true" />
                    <label class="form-check-label mt-1" for="flexRadioDefault2">
                      Off
                    </label>
                  </div>
                  <div class="form-check d-flex align-items-center justify-content-center gap-2">
                    <input value="on" class="form-check-input" type="radio" name="Personalia" id="flexRadioDefault1"
                      :checked="updateData?.Personalia === 'on' ? true : false" />
                    <label class="form-check-label mt-1" for="flexRadioDefault1">
                      On
                    </label>
                  </div>
                </div>
              </div> -->
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

<style lang="scss" scoped></style>
