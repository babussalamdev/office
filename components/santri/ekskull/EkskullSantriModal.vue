<template>
  <div>
    <!-- update database pegawai  -->
    <div class="modal fade" id="updateDataSantriEkskull" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateDataSantriEkskull" ref="updateDataSantriEkskull">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Bulk Update Ekskull
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="typo__label mb-2">List Ekskull</label>
                <multiselect v-model="ekskullShow" class="text-capitalize"
                  tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code"
                  :options="selectEkskull" :multiple="true" :taggable="true" @tag="addTag" required></multiselect>
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
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect,
  },
  computed: {
    ...mapState("santri/ekskull", ["selectEkskull", 'btn']),
    ...mapGetters('santri/ekskull', ['getEkskullShow']),
    ekskullShow: {
      get() {
        return this.getEkskullShow
      },
      set(value) {
        this.setState({ key: 'ekskullShow', value })
      }
    }
  },
  methods: {
    ...mapActions('santri/ekskull', ['updateDataSantriEkskull']),
    ...mapMutations('santri/ekskull', ['setState']),
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

<style lang="scss" scoped></style>
