<template>
  <section id="walas">
    <div class="walas">
      <WalasTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['wali kelas']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/walas/showWalas`, program);
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
@import url(~/assets/css/pegawai/pegawai.css);
</style>
