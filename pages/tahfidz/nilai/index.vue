<template>
  <section id="penilaian">
    <div class="penilaian">
      <NilaiTahfidzTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch("tahfidznilai/changeUnit");
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
