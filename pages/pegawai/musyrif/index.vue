<template>
  <section id="musyrif">
    <div class="musyrif">
      <MusyrifTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['musyrif']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/musyrif/showMusyrif`, program);
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
