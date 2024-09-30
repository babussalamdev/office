<template>
  <section id="pegawai">
    <div v-if="$auth.user.role === 'root'" class="pegawai">
      <div class="mt-3">
        <h2 class="mb-3">Settings PSB - root</h2>
        <div class="row mb-3">
          <div class="col-12 col-md-6 pe-2 pe-md-5 mb-3 mb-md-0">
            <div class="input-group pe-0 pe-md-5" style="font-size: 12px;">
              <span style="font-size: 12px;" class="material-icons input-group-text"> search </span>
              <input style="font-size: 12px;" type="text" class="form-control" placeholder="search by name"
                v-model="search">
            </div>
          </div>
          <div class="col-12 col-md-6 d-flex gap-2">

          </div>
        </div>
      </div>

      <!-- table -->
      <TablePegawaiPSB />

    </div>
    <!-- Modal -->
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      btn: true,
      page: 1,
      perPage: 10,
      table: "",
    };
  },

  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/database/changeUnit`, program);
    return program;
  },

  computed: {
    ...mapGetters('pegawai/database', ['getSearch']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('pegawai/database/setState', { key: 'search', value })
      }
    }
  },

  methods: {
  },
};
</script>

<style>
@import url(~/assets/css/pegawai/pegawai.css);

h2 {
  font-size: 14px;
}
</style>
