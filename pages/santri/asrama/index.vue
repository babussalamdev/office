<template>
  <section id="settings">
    <div class="settings">
      <AsramaSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch(`santri/asrama/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
