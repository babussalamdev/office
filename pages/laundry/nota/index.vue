<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryNotaTable />
    </div>
  </section>
</template>

<script>
export default {
  // middleware: 'permission',
  // meta: {
  //   permissions: ['laundry']
  // },
  async asyncData({ store }) {
    store.dispatch('laundry/nota/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
