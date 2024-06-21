<template>
  <section id="settings">
    <div class="settings">
      <KelasSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch(`santri/kelas/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
