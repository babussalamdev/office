<template>
  <section id="absensi">
    <div class="absensi">
      <!-- table -->
      <TableAbsensiAsrama />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch(`asramaAbsensi/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
