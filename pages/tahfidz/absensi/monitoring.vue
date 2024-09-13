<template>
  <section id="absensi">
    <div class="absensi">
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <i class="bi bi-arrow-left bg-primary p-2 rounded-circle text-white cursor-pointer" @click="backPage"></i>
        </div>
      </div>
      <!-- table -->
      <TableMonitoringAbsensiTahfidz />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    store.dispatch(`tahfidzAbsensi/getDataMonitoring`);
  },
  methods: {
    backPage() {
      this.$router.push('/tahfidz/absensi')
    }
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
