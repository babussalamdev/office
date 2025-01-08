<template>
  <section id="rekap">
    <div class="rekap">
      <h1 class="mb-3">Rekap Absensi Kelas</h1>
      <RekapAbsensiKelas />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('kelasAbsensi/rekap/changeUnit')
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
