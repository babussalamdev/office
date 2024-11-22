<template>
  <section id="report">
    <div class="report">
      <h1 class="mb-3">Report Tahsin Tahfidz</h1>
      <ReportTahsinTahfidzTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('report/tahfidz/tahsin/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
