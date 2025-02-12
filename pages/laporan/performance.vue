<template>
  <section id="report">
    <div class="report">
      <PerformanceLaporan />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('scan/changeUnitPerformance')
    }
  }
</script>

<style>
@import url(~/assets/css/report/report.css);
</style>
