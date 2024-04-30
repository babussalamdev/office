<template>
  <section id="settings">
    <div class="settings">
      <HalaqahSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`santri/halaqah/changeUnit`, program);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
