<template>
  <section id="penilaian">
    <div class="penilaian">
      <PenilaianEkskullTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch("ekskull/nilai/changeUnit");
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
