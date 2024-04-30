<template>
  <section id="struktur">
    <div class="struktur">
      <!-- table -->
      <TableSetupAbsensi />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`setupabsensi/getAbsensi`, program);
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
