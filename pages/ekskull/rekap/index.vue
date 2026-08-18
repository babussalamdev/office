<template>
  <section id="rekap">
    <div class="rekap">
      <h1 class="mb-3">Rekap Absensi Ekskull</h1>
      <RekapAbsensiEkskull />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch("ekskullAbsensi/rekap/changeUnit");
    },
  };
</script>

<style>
  @import url(~/assets/css/santri/santri.css);
</style>
