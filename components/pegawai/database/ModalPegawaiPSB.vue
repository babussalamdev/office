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
                Update Settings PSB ( Admin )
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="typo__label mb-2">Program</label>
                <multiselect name="Program" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="Name" track-by="SK" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
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
import { options } from "@fullcalendar/core/preact";
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
    ...mapState('psb', ["select", 'btn', 'value', 'password', 'options', 'updateData', 'jabatanShow', 'program']),
    ...mapGetters('psb', ['getValue', 'getJabatan']),
    value: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('psb/setValue', value)
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
        const program = data?.Psb?.program;
        if (program && program.length > 0) {
          const programArray = program.split(","); // Memisahkan string menjadi array dan menghapus spasi ekstra
          const mappedArray = programArray.map((x) => {
            const option = this.options.find((option) => option.SK === x);
            return { SK: x, Name: option ? option.Name : null };
          });
          this.value = mappedArray;
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions('psb', ['inputPegawai', 'updatePegawaiAdmin', 'updatePegawai']),
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
