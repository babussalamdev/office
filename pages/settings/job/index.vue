<template>
  <section id="job">
    <div class="job">
      <!-- table -->
      <JobTable />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch('job/changeUnit')
    }
  }
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
