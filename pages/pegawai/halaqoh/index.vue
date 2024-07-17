<template>
  <section id="pegawai">
    <div class="pegawai">
      <HalaqahTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/halaqah/changeUnit`, program);
  },
};
</script>

<style>
@import url(~/assets/css/pegawai/pegawai.css);
</style>
