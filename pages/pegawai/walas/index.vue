<template>
  <section id="walas">
    <div class="walas">
      <WalasTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['wali kelas']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/walas/showWalas`, program);
  },
};
</script>

<style>
@import url(~/assets/css/pegawai/pegawai.css);
</style>
