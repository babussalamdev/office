<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryDataSantriTable />
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
    store.dispatch('laundry/datasantri/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
