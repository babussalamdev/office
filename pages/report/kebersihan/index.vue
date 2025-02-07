<template>
  <section id="report">
    <div class="report">
      <ReportMaintenance />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('maintenance/changeUnitReport')
    }
  }
</script>

<style>
@import url(~/assets/css/report/report.css);
</style>
