<template>
  <section id="absensi">
    <div class="absensi">
      <!-- table -->
      <TableAbsensiTahfidz />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch(`tahfidzAbsensi/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
