<template>
  <section id="rekap">
    <div class="rekap">
      <h1 class="mb-3">Rekap Tahfidz</h1>
      <rekapTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('rekap/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
