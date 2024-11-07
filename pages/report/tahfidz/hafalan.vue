<template>
  <section id="report">
    <div class="report">
      <h1 class="mb-3">Report Nilai Tahfidz</h1>
      <ReportHafalanTahfidzTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('report/tahfidz/hafalan/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
