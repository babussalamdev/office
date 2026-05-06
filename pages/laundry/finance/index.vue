<template>
  <section id="laundry">
    <div class="position-relative">
      <!-- amount -->
      <LaundryFinanceHeader />
      <div class="row">
        <div class="col-12 col-md-5 mb-3">
          <LaundryFinanceBalance />
        </div>
        <div class="col-12 col-md-7">
          <LaundryFinanceHistory />
        </div>
      </div>
      <LaundryFinanceModal />
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
      store.dispatch("laundry/finance/changeUnit");
    },
  };
</script>
