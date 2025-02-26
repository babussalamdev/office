<template>
  <section id="halaqoh">
    <div class="halaqoh animate__animated animate__fadeInUp">
      <h3 class="mb-3">Settings Absensi Halaqah</h3>
      <!-- table -->
      <TableSetupAbsensiHalaqah />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('setupabsensihalaqah/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
