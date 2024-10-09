<template>
  <section id="card-table">
    <div class="card-table">
      <CardTable />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('card/changeUnit')
    }
  }
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
