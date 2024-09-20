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
    const data = store.state.asramaAbsensi.permissions

    if ( data.includes('izin')) {
      store.dispatch(`asramaAbsensi/changeUnitSecond`);
    } else {
      redirect('/asrama/absensi')
    }
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
