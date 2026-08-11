<template>
  <section id="jurnal">
    <div class="jurnal">
      <ReportJurnalMatanTable />
    </div>
  </section>
</template>

<script>
  export default {
    middleware: "permission",
    meta: {
      permissions: ["report jurnal"],
    },
    async asyncData({ store }) {
      store.dispatch("report/matan/jurnal/changeUnit");
    },
  };
</script>

<style>
  @import url(~/assets/css/kelas/kelas.css);
</style>
