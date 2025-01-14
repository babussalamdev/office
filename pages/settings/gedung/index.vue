<template>
  <section id="gedung">
    <div class="gedung">
      <!-- table -->
      <GedungTable />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('gedung/changeUnit')
    }
  }
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
