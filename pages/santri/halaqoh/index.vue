<template>
  <section id="settings">
    <div class="settings">
      <HalaqahSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['halaqah']
  },
  async asyncData({ store }) {
    store.dispatch(`santri/halaqah/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
