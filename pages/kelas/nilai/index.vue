<template>
  <section id="penilaian">
    <div class="penilaian">
      <PenilaianKelasTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch("kelas/nilai/changeUnit");
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
