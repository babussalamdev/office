<template>
  <section id="report">
    <div class="report">
      <h1 class="mb-3">Report Murojaah Tahfidz</h1>
      <ReportMurojaahTahfidzTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('report/tahfidz/murojaah/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
