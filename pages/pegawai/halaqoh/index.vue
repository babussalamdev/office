<template>
  <section id="musyrif">
    <div class="musyrif">
      <HalaqahTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/halaqah/showHalaqah`, program);
  },
};
</script>

<style>
@import url(~/assets/css/pegawai/pegawai.css);
</style>
