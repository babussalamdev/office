<template>
  <section id="walas">
    <div class="walas">
      <WalasTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/walas/showWalas`, program);
  },
};
</script>

<style scoped></style>
