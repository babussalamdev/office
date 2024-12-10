<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryNotaDetailAddForm :sk="sk" />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store, params, redirect }) {
    const sk = params.sk
    store.commit('laundry/nota/addDataPerSantri')
    return { sk }
  },
}
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
