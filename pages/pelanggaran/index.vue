<template>
  <section id="pelanggaran">
    <div class="pelanggaran">
      <PelanggaranTable />
      <PelanggaranModal />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['page pelanggaran']
  },
  async asyncData({ store }) {
    store.dispatch(`pelanggaran/changeUnit`);
  },
  mounted() {
    this.closeAllModals();;
  },
  methods: {
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
};
</script>

<style>
@import url(~/assets/css/pelanggaran/pelanggaran.css);
</style>
