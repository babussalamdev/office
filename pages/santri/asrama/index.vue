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
    const program = localStorage.getItem("program");
    store.dispatch(`santri/asrama/changeUnit`, program);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
