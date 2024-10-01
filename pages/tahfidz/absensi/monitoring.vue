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
    },
    closeAllModals() {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      // Menghapus kelas dan style dari body
      document.body.classList.remove('modal-open'); // Menghapus kelas
      document.body.style.overflow = ''; // Menghapus gaya inline
      document.body.style.paddingRight = ''; // Menghapus gaya inline
    }
  },
  mounted() {
    this.closeAllModals();;
  },
};
</script>

<style>
@import url(~/assets/css/absensi/absensi.css);
</style>
