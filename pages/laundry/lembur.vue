<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryLemburTable />
    </div>
  </section>
</template>

<script>
export default {
  name: "mutabaah",
  async asyncData({ store }) {
    store.dispatch('mutabaah/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
