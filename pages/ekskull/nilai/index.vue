<template>
  <section id="penilaian">
    <div class="penilaian">
      <PenilaianEkskullTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['page ekskull']
  },
  async asyncData({ store }) {
    store.dispatch("ekskull/nilai/changeUnit");
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
