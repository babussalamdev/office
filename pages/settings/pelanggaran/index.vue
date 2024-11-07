<template>
  <section id="struktur">
    <div class="struktur">
      <!-- table -->
      <TableSetupPelanggaran />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['setup pelanggaran']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`setuppelanggaran/getPelanggaran`, program);
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
@import url(~/assets/css/setting/setting.css);
</style>
