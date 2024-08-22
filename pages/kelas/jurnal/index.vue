<template>
  <section id="jurnal">
    <div class="jurnal">
      <JurnalTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'root',
  meta: {
    roots: 'root'
  },
  async asyncData({ store }) {
    store.dispatch('jurnal/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
