<template>
  <section id="laundry">
    <div class="laundry">
      <LaundryChannelTable />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('laundry/channel/changeUnit')
    }
  }
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
