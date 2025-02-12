<template>
  <section id="laporan">
    <div class="laporan">
      <ActivityLaporan />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('scan/changeUnitActivity')
    }
  }
</script>

<style>
@import url(~/assets/css/report/report.css);
</style>
