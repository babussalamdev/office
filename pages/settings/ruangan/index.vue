<template>
  <section id="ruangan">
    <div class="ruangan">
      <!-- table -->
      <RuanganTable />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('ruangan/changeUnit')
    }
  }
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
