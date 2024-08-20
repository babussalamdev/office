<template>
  <section id="jurnal">
    <div class="jurnal">
      <JurnalTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('jurnal/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
