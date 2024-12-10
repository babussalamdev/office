<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundrySettingsKeranjangTable />
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
    store.dispatch('laundry/settings/keranjang/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
