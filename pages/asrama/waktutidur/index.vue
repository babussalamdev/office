<template>
  <section id="waktu-tidur">
    <div class="waktu-tidur">
      <WaktuTidurTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch('asrama/waktuTidur/changeUnit')
  }
};
</script>

<style>
@import url(~/assets/css/santri/santri.css)
</style>
