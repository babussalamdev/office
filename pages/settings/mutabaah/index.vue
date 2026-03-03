<template>
  <section id="halaqoh">
    <div class="halaqoh animate__animated animate__fadeInUp">
      <div class="row">
        <!-- left side -->
        <!-- Halaqoh -->
        <div class="col-12">
          <div class="row mt-3 animate__animated animate__fadeInUp">
            <div class="col-12 col-md-6 d-flex align-items-center">
              <h3>Settings Mutabaah</h3>
            </div>
          </div>

          <!-- table -->
          <TableSetupMutabaah />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    async asyncData({ store }) {
      await store.dispatch("setupmutabaah/changeUnit");
    },
  };
</script>

<style>
  @import url(~/assets/css/setting/setting.css);
</style>
