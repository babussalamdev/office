<template>
  <section id="report">
    <div class="report">
      <h2 class="mb-3">Report Absensi</h2>
      <!-- table -->
      <ReportAbsensiPengampu />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('report/pengampu/changeUnit')
  },
};
</script>

<style>
@import url(~/assets/css/report/report.css);
</style>
