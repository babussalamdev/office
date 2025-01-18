<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="ruanganModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="updateRuangan" id="ruanganFormUpdate">
            <div class="modal-body">
              <div class="">
                <label class="typo__label mb-2">Job</label>
                <multiselect name="Job" v-model="value" tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true"
                  :taggable="true" @tag="addTag" required></multiselect>
                <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect,
  },
  computed: {
    ...mapState('ruangan', ['btn', 'options', 'updateData']),
    ...mapGetters('ruangan', ['getValue']),
    value: {
      get() {
        return this.getValue
      },
      set(value) {
        this.$store.commit('ruangan/setState', { key: 'value', value})
      }
    }
  },
  watch: {
    updateData: {
      handler(data) {
        const job = data?.Job;
        if (job && job.length > 0) {
          const jobArray = job.split(","); // Memisahkan string menjadi array dan menghapus spasi ekstra
          const mappedArray = jobArray.map((x) => {
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
    ...mapActions('ruangan', ['updateRuangan']),
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
  },
}
</script>

<style scoped>

</style>
