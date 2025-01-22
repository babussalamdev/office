<template>
  <section id="report">
    <div class="report">
      <ReportLaporan />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('scan/changeUnitReport')
    }
  }
</script>

<style>
@import url(~/assets/css/report/report.css);
</style>
