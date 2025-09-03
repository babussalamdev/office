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
      const data = store.state.laundry.nota.datasDetail;
      console.log(data);
      const sk = params.sk;
      if (data.length === 0) {
        store.commit("laundry/nota/addDataPerSantri");
        // redirect(`/laundry/nota/${sk.replace('#', '%23')}`)
      } else {
        store.commit("laundry/nota/addDataPerSantri");
      }
      return { sk };
    },
  };
</script>

<style>
  @import url(~/assets/css/laundry/laundry.css);
</style>
