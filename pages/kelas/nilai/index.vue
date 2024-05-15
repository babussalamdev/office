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
    store.dispatch("kelas/loadKelasPenilaian");
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
