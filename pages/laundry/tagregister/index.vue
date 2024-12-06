<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryRegisterTable />
    </div>
  </section>
</template>

<script>
export default {
  // middleware: 'permission',
  // meta: {
  //   permissions: ['laundry']
  // },
  name: "mutabaah",
  async asyncData({ store }) {
    store.dispatch('laundry/register/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
