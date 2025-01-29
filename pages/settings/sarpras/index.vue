<template>
  <section id="sarpras">
    <div class="sarpras">
      <TableSarpras />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('sarpras/changeUnit')
  }
}
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
