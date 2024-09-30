<template>
  <section id="pegawai">
    <div v-if="$auth.user.role === 'root'" class="pegawai">
      <div class="mt-3">
        <h2 class="mb-3">Settings PSB - root</h2>
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
    store.dispatch(`psb/changeUnit`, program);
    return program;
  },

  computed: {
    ...mapGetters('psb', ['getSearch']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('psb/setState', { key: 'search', value })
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
