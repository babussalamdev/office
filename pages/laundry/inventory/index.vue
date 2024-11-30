<template>
  <section id="laundry">
    <div class="laundry">
      <LaundryInventoryTable />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('laundry/inventory/changeUnit')
    }
  }
</script>

<style scoped>

</style>
