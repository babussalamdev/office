<template>
  <section id="rekap">
    <div class="rekap">
      <h1 class="mb-3">Rekap Nilai Tahfidz</h1>
      <RekapNilaiTahfidzTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('rekap/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
