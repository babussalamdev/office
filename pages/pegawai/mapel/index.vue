<template>
  <section id="mapel">
    <div class="mapel">
      <MapelSetupTable />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: 'permission',
  meta: {
    permissions: ['pengajar']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/mapel/changeUnit`, program);
  },
};
</script>

<style>
@import url(~/assets/css/pegawai/pegawai.css);
</style>
