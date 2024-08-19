<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryInputDataTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['laundry']
  },
  name: "mutabaah",
  async asyncData({ store }) {
    store.dispatch('mutabaah/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
