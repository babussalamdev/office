<template>
  <section id="absensi">
    <div class="absensi">
      <!-- table -->
      <LaundryAbsensiTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('laundry/absensi/changeUnit')
  }
}
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
