<template>
  <section id="musyrif">
    <div class="musyrif">
      <MusyrifTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/musyrif/showHalaqah`, program);
  },
};
</script>

<style>
@import url(~/assets/css/pegawai/pegawai.css);
</style>
