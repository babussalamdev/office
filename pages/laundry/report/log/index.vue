<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryReportLogTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('laundry/report/log/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
