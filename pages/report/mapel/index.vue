<template>
  <section id="nilai-mapel">
    <div class="nilai-mapel">
      <ReportNilaiMapel />
    </div>
  </section>
</template>

<script>
export default {
  // middleware: 'permission',
  // meta: {
  //   permissions: ['report mapel']
  // },
  async asyncData({ store }) {
    store.dispatch("report/nilaimapel/changeUnit");
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
