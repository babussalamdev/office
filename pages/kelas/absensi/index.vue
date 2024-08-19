<template>
  <section id="absensi">
    <div class="absensi">
      <!-- table -->
      <TableAbsensiKelas />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'root',
  meta: {
    roots: 'root'
  },
  async asyncData({ store }) {
    store.dispatch(`kelasAbsensi/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
