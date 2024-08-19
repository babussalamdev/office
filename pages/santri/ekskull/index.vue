<template>
  <section id="settings">
    <div class="settings">
      <EkskullSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['ekskull']
  },
  async asyncData({ store }) {
    store.dispatch(`santri/ekskull/changeUnit`);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
