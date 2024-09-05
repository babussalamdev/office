<template>
  <section id="nilai-tahfidz">
    <div class="nilai-tahfidz">
      <ReportNilaiTahfidzTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch("report/tahfidz/nilai/changeUnit");
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
