<template>
  <section id="nilai-mapel">
    <div class="nilai-mapel">
      <LaggerMapel />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['report lagger']
  },
  async asyncData({ store }) {
    store.dispatch('report/lagger/changeUnit');
  },
};
</script>

<style>
@import url(~/assets/css/kelas/kelas.css);
</style>
