<template>
  <section id="authority">
    <div class="authority">
      <AuthorityTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('authority/changeUnit')
  }
}
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
