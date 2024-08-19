<template>
  <section id="pelanggaran">
    <div class="pelanggaran">
      <PelanggaranTable />
      <PelanggaranModal />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['page pelanggaran']
  },
  async asyncData({ store }) {
    store.dispatch(`pelanggaran/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/pelanggaran/pelanggaran.css);
</style>
