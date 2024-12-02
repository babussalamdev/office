<template>
  <section>
    <div>
      <!-- amount -->
      <LaundryFinanceHeader />
      <div class="row">
        <div class="col-12 col-md-4">
          <LaundryFinanceBalance />
        </div>
        <div class="col-12 col-md-8">

        </div>
      </div>
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
    store.dispatch('laundry/finance/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
