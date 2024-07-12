<template>
  <section id="home">
    <div v-if="unit" class="home animate__animated animate__fadeIn">
      <div v-if="$auth.user.role !== 'root'">
        <Chart />
      </div>
      <div v-if="$auth.user.role === 'root'">
        <ChartAdmin />
      </div>
      <div class="row">
        <div class="col-12 col-lg-6 mb-3">
          <!-- kelas -->
          <!-- <ChartClass /> -->
        </div>
        <div class="col-12 col-lg-6 mb-3">
          <!-- pelanggaran -->
          <!-- <Violation /> -->
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Welcome</h1>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      violation: [
        { name: "Fauzan Gunawan", jenis: "Bahasa" },
        { name: "Dean Syawafian", jenis: "Keamanan" },
        { name: "Sulthan Bahij", jenis: "Ibadah" },
        { name: "Abid Biaggy", jenis: "Kebersihan" },
        { name: "Hammam Musyafa", jenis: "Bahasa" },
      ],
    };
  },
  computed: {
    ...mapState("index", ["unit"]),
  },

  async asyncData({ store }) {
    const program = localStorage.getItem('program')
    store.dispatch(`home/setMainChart`, program);
  },
};
</script>

<style scoped>
.home {
  height: min-content;
}

@media screen and (max-width: 992px) {
  .home {
    height: max-content;
  }
}
</style>
