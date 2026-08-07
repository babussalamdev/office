<template>
  <section id="rekap">
    <div class="rekap">
      <h1 class="mb-3">Report Absensi Matan</h1>
      <ReportAbsensiMatan />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch("report/matan/absensi/changeUnit");
    },
  };
</script>

<style>
  @import url(~/assets/css/santri/santri.css);
</style>
