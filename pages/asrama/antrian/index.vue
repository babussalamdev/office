<template>
  <section id="absensi">
    <div class="absensi">
      <!-- table -->
      <TableListIzinAsrama />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
      Permissions: ['page asrama']
  },
  async asyncData({ store, redirect }) {
    store.dispatch(`asramaAbsensi/changeUnitSecond`);
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
