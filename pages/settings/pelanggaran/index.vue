<template>
  <section id="struktur">
    <div class="struktur">
      <!-- table -->
      <TableSetupPelanggaran />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['setup pelanggaran']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`setuppelanggaran/getPelanggaran`, program);
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
