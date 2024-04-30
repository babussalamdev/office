<template>
  <section id="absensi">
    <div class="absensi">
      <h2 class="mb-3">Absensi Asrama</h2>
      <!-- table -->
      <TableAbsensiAsrama />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch(`absensi/asrama/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
