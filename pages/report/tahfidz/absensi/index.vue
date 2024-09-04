<template>
  <section id="rekap">
    <div class="rekap">
      <h1 class="mb-3">Report Absensi Tahfidz</h1>
      <ReportAbsensiTahfidzTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('report/tahfidz/absensi/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
