<template>
  <section id="settings">
    <div class="settings">
      <EkskullSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`santri/ekskull/changeUnit`, program);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
