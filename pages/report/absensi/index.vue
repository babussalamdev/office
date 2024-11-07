<template>
  <section id="report">
    <div class="report">
      <h2 class="mb-3">Report Absensi Kelas</h2>
      <!-- table -->
      <ReportAbsensiKelas />
    </div>
  </section>
</template>

<script>
export default {
  // middleware: 'permission',
  // meta: {
  //   permissions: ['report absensi']
  // },
  async asyncData({ store }) {
    store.dispatch('report/absensi/changeUnit')
  },
};
</script>

<style>
@import url(~/assets/css/report/report.css);
</style>
